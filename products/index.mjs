import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand, PutCommand, GetCommand, DeleteCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const dynamo = DynamoDBDocumentClient.from(client);

const tableName = "products"; // Input your table name

export const handler = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    switch (event.routeKey) {
      case "DELETE /items/{id}":
        await dynamo.send(
          new DeleteCommand({
            TableName: tableName,
            Key: {
              id: event.pathParameters.id,
            },
          })
        );
        body = `Deleted item ${event.pathParameters.id}`;
        break;

      case "GET /items/{id}":
        const getItemParams = {
          TableName: tableName,
          Key: {
            id: event.pathParameters.id,
          },
        };
        const getItemResponse = await dynamo.send(new GetCommand(getItemParams));
        body = getItemResponse.Item;
        break;

      case "GET /items/{attribute}/{attributeValue}":
        const attribute = event.pathParameters.attribute;
        let attributeValue = event.pathParameters.attributeValue;

        const validAttributes = ["name", "category", "price", "id", "features", "subcategory", "description", "url"];
        if (!validAttributes.includes(attribute)) {
          throw new Error(`Unsupported attribute: "${attribute}"`);
        }

        const filterExpression = `#${attribute} = :value`;
        const expressionAttributeNames = {
          [`#${attribute}`]: attribute,
          "#id": "id",
          "#n": "name",
          "#u": "url"
        };
        let expressionAttributeValues = {
          ":value": attributeValue,
        };

        // If the attribute is "price", parse the value as a number
        if (attribute === "price") {
          attributeValue = parseFloat(attributeValue);
          expressionAttributeValues[":value"] = attributeValue;
        }

        const scanParams = {
          TableName: tableName,
          FilterExpression: filterExpression,
          ExpressionAttributeNames: expressionAttributeNames,
          ExpressionAttributeValues: expressionAttributeValues,
          ProjectionExpression: "#id, #n, category, price, #u, subcategory, description, features",
        };
        const scanResponse = await dynamo.send(new ScanCommand(scanParams));
        body = scanResponse.Items;
        break;

      case "GET /items":
        const scanAllParams = {
          TableName: tableName,
        };
        const scanAllResponse = await dynamo.send(new ScanCommand(scanAllParams));
        body = scanAllResponse.Items;
        break;

      case "PUT /items":
        const putItemRequest = JSON.parse(event.body);
        const putItemParams = {
          TableName: tableName,
          Item: putItemRequest,
        };
        await dynamo.send(new PutCommand(putItemParams));
        body = `Put item ${putItemRequest.id}`;
        break;

      default:
        throw new Error(`Unsupported route: "${event.routeKey}"`);
    }
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers,
  };
};
