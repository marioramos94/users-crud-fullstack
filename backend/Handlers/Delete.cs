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
    public class DeleteHandler
    {       
        [LambdaSerializer(typeof(Amazon.Lambda.Serialization.Json.JsonSerializer))] 
        public async Task<dynamic> Delete(APIGatewayProxyRequest message)
        {
            string id = message.PathParameters["id"];
            var client = new AmazonDynamoDBClient();
            var tableName = "Users";
            var table = Table.LoadTable(client, tableName);
            try
            {
                var result = await table.DeleteItemAsync(id);
            }
            catch (Exception ex)
            {
                Console.WriteLine("DeleteItem failed: " + ex.Message);
            };
            return new APIGatewayProxyResponse
            {
                StatusCode = 200,
                Headers = new Dictionary<string, string> { { "Content-Type", "application/json" }, { "Access-Control-Allow-Origin", "*" } }
            };
        }
    }

}
