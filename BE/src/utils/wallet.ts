import { Wallet } from 'ethers';
import { S3 } from 'aws-sdk';
import { InternalServerError, UnauthorizeError } from 'src/global/errorClass';
import { S3_CONFIG } from 'src/configs/s3.config';

interface WalletData {
  address: string;
  keystoreFilePath: string;
  privateKey: string;
}

export async function CreateWalletAndSaveKeystoreFile(
  password: string,
): Promise<WalletData> {
  try {
    // Generate a new Ethereum wallet
    const wallet = Wallet.createRandom();

    // Ethereum address
    const address = wallet.address;

    const privateKey = wallet.privateKey;

    // Encrypt the private key with the password
    const encryptedJson = await wallet.encrypt(password);

    // Initialize AWS S3 client
    const s3 = new S3({
      accessKeyId: S3_CONFIG.accessKey,
      secretAccessKey: S3_CONFIG.secretKey,
      region: S3_CONFIG.region,
    });

    // Specify S3 bucket name and key (path) to save the file
    const bucketName = S3_CONFIG.bucketName;
    const key = `${address}.json`;

    const encryptedJsonBuffer = Buffer.from(encryptedJson);

    // Upload keystore JSON file to AWS S3
    await s3
      .upload({
        Bucket: bucketName,
        Key: key,
        Body: encryptedJsonBuffer,
      })
      .promise();

    // Construct S3 file URL
    const keystoreFilePath = `https://${bucketName}.s3.${s3.config.region}.amazonaws.com/${key}`;

    return {
      address: address,
      keystoreFilePath: keystoreFilePath,
      privateKey: privateKey,
    };
  } catch (error) {
    throw new InternalServerError("Can't create keystore file", error.message);
  }
}

export async function VerifyWalletFromKeystoreContent(
  keystoreContent: string,
  password: any,
): Promise<WalletData> {
  try {
    // Decrypt the keystore using the password
    const wallet = await Wallet.fromEncryptedJson(
      JSON.stringify(keystoreContent),
      password,
    );

    // Ethereum address
    const address = wallet.address;

    // Extract private key (optional)
    const privateKey = wallet.privateKey;

    return {
      address: address,
      privateKey: privateKey,
      keystoreFilePath: '',
    };
  } catch (error) {
    if (error.code === 'IncorrectPassword') {
      throw new UnauthorizeError(
        'Incorrect password or keystore file',
        error.message,
      );
    }
    throw new InternalServerError(
      'Failed to verify wallet from keystore content',
      error.message,
    );
  }
}
