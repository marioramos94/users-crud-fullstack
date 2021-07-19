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
    public class ListHandler
    {      
        [ LambdaSerializer(typeof(Amazon.Lambda.Serialization.Json.JsonSerializer))]
        public async Task<dynamic> List(APIGatewayProxyRequest message)
        {
            var client = new AmazonDynamoDBClient();
            var tableName = "Users";
            var table = Table.LoadTable(client, tableName);
            var search = table.Scan(new ScanOperationConfig
            {
                Select = SelectValues.AllAttributes,
                CollectResults = true
            });
            List<User> userList = new List<User>();
            do
            {
                foreach (var document in await search.GetNextSetAsync())
                {
                    userList.Add(new User
                    {
                        id = document["id"],
                        firstName = document["firstName"],
                        lastName = document["lastName"],
                        email = document["email"]
                    });
                }
            } while (!search.IsDone);
            return new APIGatewayProxyResponse
            {
                StatusCode = 200,
                Body = JsonConvert.SerializeObject(userList),
                Headers = new Dictionary<string, string> { { "Content-Type", "application/json" }, { "Access-Control-Allow-Origin", "*" } }
            };
        }
    }

}
