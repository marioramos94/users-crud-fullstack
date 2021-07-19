using System;
using System.Json;
using System.Threading.Tasks;
using System.Collections.Generic;
using Amazon;
using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DocumentModel;
using Amazon.DynamoDBv2.DataModel;
using Amazon.DynamoDBv2.Model;
using Amazon.Lambda.APIGatewayEvents;
using Amazon.Lambda.Core;
using Amazon.Runtime;
using System.IO;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Models;
namespace AwsDotnetCsharp
{
    public class UpdateHandler
    {        
        [LambdaSerializer(typeof(Amazon.Lambda.Serialization.Json.JsonSerializer))]   
        public async Task<dynamic> Update(APIGatewayProxyRequest message)
        {
            string id = message.PathParameters["id"];
            string body = message.Body;
            JsonValue value = JsonValue.Parse(body);
            JsonObject userObj = value as JsonObject;
            var doc = new Document();
            doc["id"] = id;
            doc["firstName"] = (string)userObj["firstName"];
            doc["lastName"] = (string)userObj["lastName"];
            doc["email"] = (string)userObj["email"];
            var client = new AmazonDynamoDBClient();
            var tableName = "Users";
            var table = Table.LoadTable(client, tableName);
            var result = await table.PutItemAsync(doc);
            return new APIGatewayProxyResponse
            {
                StatusCode = 200,
                Headers = new Dictionary<string, string> { { "Content-Type", "application/json" }, { "Access-Control-Allow-Origin", "*" } }
            };
        }
    }

}
