import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  PutCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";

const TABLE_NAME = process.env.DYNAMODB_TABLE ?? "attestations";

const client = new DynamoDBClient({ region: "us-east-2" });

export const docClient = DynamoDBDocumentClient.from(client);

export interface AttestationItem {
  person_id: string;
  attestation_id: string;
  issuer: string;
  attestation_type: string;
  timestamp: string;
  hash: string;
}

export async function writeAttestation(item: AttestationItem): Promise<void> {
  await docClient.send(
    new PutCommand({
      TableName: TABLE_NAME,
      Item: item,
    }),
  );
}

export async function getBundle(person_id: string): Promise<AttestationItem[]> {
  const result = await docClient.send(
    new QueryCommand({
      TableName: TABLE_NAME,
      KeyConditionExpression: "person_id = :person_id",
      ExpressionAttributeValues: {
        ":person_id": person_id,
      },
    }),
  );

  return (result.Items as AttestationItem[]) ?? [];
}
