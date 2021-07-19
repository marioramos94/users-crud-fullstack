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
    public class GetHandler
    {             
        [ LambdaSerializer(typeof(Amazon.Lambda.Serialization.Json.JsonSerializer))]  
        public async Task<dynamic> Get(APIGatewayProxyRequest message)
        {
            string id = message.PathParameters["id"];
            var client = new AmazonDynamoDBClient();
            var tableName = "Users";
            var table = Table.LoadTable(client, tableName);
            Document userItem = await table.GetItemAsync(id);
            var response = new APIGatewayProxyResponse();
            if (userItem == null)
            {
                response.StatusCode = 404;
                return response;
            }
            response.StatusCode = 200;
            response.Body = userItem.ToJson();
            response.Headers = new Dictionary<string, string> { { "Content-Type", "application/json" }, { "Access-Control-Allow-Origin", "*" } };
            return response;
        }
    }

}
