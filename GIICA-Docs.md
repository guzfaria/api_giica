---
GIICA RESTful API
---
This API calculates the land study of a lot based on the parameters provided. It is designed to be used by other applications as an additional functionality. The documentation is organized in Markdown for easy access and understanding.

### Available Endpoints

The API provides the following endpoints:

- `[/api/v1/landstudy/{lotSize}]`: Calculates the area of each apartment based on how many units are in the floor suggestions based on the lot size. (GET)

- `[/api/v1/landstudy/partial]`: Calculates the land study of the lot and returns the main results. (POST)

- `[/api/v1/landstudy/full]`: Calculates a full land study of the lot. (POST)

### Authentication

All endpoints that calculate the land study (`/api/v1/landstudy/partial` and `/api/v1/landstudy/full`) require authentication via JWT token (details on how to obtain the token will be provided in a separate document).

### Example Usage (cURL)

The following examples use the cURL command to make requests to the API. **Replace** `<your_token>` with your actual JWT token for endpoints that require authentication.

**Get product suggestions by lot size**

Bash
```
curl https://app.giica.com.br/api/v1/landstudy/1000
```

**Calculate partial and full land study**

Change the URL between partial and full for the desired result.
Bash
```
curl -X POST https://app.giica.com.br/api/v1/landstudy/partial \
  -H 'Authorization: Bearer <your_token>' \
  -H 'Content-Type: application/json' \
  -d '{
    "lotInfo": [
      {
        "setor": 100,
        "quadra": 155,
        "lotes": ["1234", "5678"],
        "codlogs": ["123555", "456555"],
      }],
     "zonaInfos": [
          {
            "zona": "ZM",
            "ca": 2,
            "to": 0.8,
            "taxa_de_permeabilidade": 0.3,
            "fachada_ativa": 0.5,
            "beneficio": 0,
            "gabarito": 48,
            "cota_parte": 0.2,
            "cota_solidariedade": false,
            "uso": "R2v"
          }
      ],
      "produtos": [
          {
            "unidade_1": 100,
            "unidade_1Porcent": 80,
            "unidade_2": 80,
            "unidade_2Porcent": 20,
            "vagas": 2,
            "NR": 45
          }
      ]
  }'

```
## Product suggestions for land study
**Description:**

This endpoint calculates the area of the apartments (products) in the floor of the building. It returns 16 options and the number of options represents the number of apartments that compose one floor. The product suggestions considers the lot area, percentage of terrace and how many units will the floor have.

**HTTP Method:** GET

**URL:** /api/v1/landstudy/:lotsize

**Authorization:** Logged in user (Required)

**Properties**

- `lotSize`: Rounded area of the lot. Type Int. (Required)

**Request example**

    enter https://app.giica.com.br/api/v1/landstudy?lotsize=1050

## Full Land Study Calculation (/api/v1/landstudy/full)

**Description:**

This endpoint calculates a full land study of the lot based on the parameters provided. The full land study considers all information in the request to perform the most accurate calculations.

**HTTP Method:** POST

**URL:** /api/v1/landstudy/full

**Authentication:** Bearer Token (Required)

**Headers:**

- Content-Type: application/json

**Request Structure (payload):**

The request must contain a JSON in the message body with the following structure:

JSON

```
{
  "lotInfo": [
    {
      "setor": "string", (Required)
      "quadra": "string", (Required)
      "lotes": ["string", ...], (Required) - Array of lot identifiers
      "codlogs": ["string", ...], (Required) - Array of codlogs
    }
  ],
  "zonaInfos": [
    {
       "zona": "string", (Required) - Zone name
       "ca": number,
       "to": number, 
       "taxa_de_permeabilidade": number,
       "fachada_ativa": number,
       "beneficio": number,
       "gabarito": string | number,
       "cota_parte": number,
     }
  ],
  "produtos": [
    {
      "unidade_1": number,
      "unidade_1Porcent": number,
      "unidade_2": number,
      "unidade_2Porcent": number,
    }
  ],
  "cota_solidariedade": boolean,
  "uso": "string",
  "vagas": number,
  "NR": number
}

```
**Properties:**

- `lotInfo`: Array of objects containing lot information.

  - `setor`: Lot sector (Required).

  - `quadra`: Lot block (Required).

  - `lotes`: Array containing lot identifiers (Required).

  - `codlogs`: Array containing codlogs (Required).

  - `zonaInfos`: Array of objects containing zone information. (required) *default parameters will follow the GIICA database values based on the zone's name*

    - `zona`: Zone name (Required).

    - `ca`: Zone's Utilization Coefficient (Optional).

    - `to`: Zone's Occupation Rate (Optional).

    - `taxa_de_permeabilidade`: Zone's Permeability Rate (optional).

    - `fachada_ativa`: Zone's Active Facade (optional).

    - `beneficio`: Zone's Benefit (optional).

    - `gabarito`: Zone's Height Limit (optional).

    - `cota_parte`: Zone's Share (optional).

  - `produtos`: Array of objects containing product information (required).

    - `unidade_1`: Quantity of product unit 1 (required).

    - `unidade_1Percent`: Percentage of product unit 1 (required).

    - `unidade_2`: Quantity of product unit 2 (optional). *default | null*

    - `unidade_2Percent`: Percentage of product unit 2 (optional). *default | 0*

- `cota_solidariedade`: Zone's Solidarity Quota (optional). *default | false*

- `uso`: Zone's Use (optional). *default | "R2v"*

 - `vagas`: Quantity of product parking spaces (optional). *default | 0*

 - `NR`: Area of non residential units (optional).  *default | 0*

**Responses:**

- **200 OK**: Successful request. The response body will contain a JSON with the full land study result.

- **400 Bad Request**: Error in the request. The response body will contain a JSON with error details.

- **401 Unauthorized**: Invalid or missing token.

- **500 Internal Server Error**: Internal server error.

**Example Response (200 OK):**

