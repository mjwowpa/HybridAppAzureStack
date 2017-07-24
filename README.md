# Azure Stack Development Kit: Hybrid Scenario Demo

This project is meant for use with **Azure Stack Development Kit**. Azure Stack Technical Preview 3 Refresh users can still adapt the repo with [TP3-Refresh](https://github.com/Azure/AzureStack-Tools/tree/TP3-Refresh).

## Description

### Aim

This repo contains resources which allow you to create quickly a visual demo of a basic scenario on Azure Stack.
In this project, there is a simple e-commerce solution to deploy on the Microsoft public Cloud and a second solution to validate your orders on a private platform for Azure Stack with the same consistency of Azure.
Last but not least, you will be able to demonstrate hybrid tricks with this scenario. 

#### Why hybrid ?

The aim is to split the vendor-admin section from the site with a dedicated platform more complex, as want the "vendor".
This internal side is always connected with public-site for listening all the orders.
The value proposition is:
- If this platform is offline (shutdown or crash in production), the public-site keeps working.
- Azure Storage saves all orders when internal platform is offline.
- When rebooting the private logistic site, the application can automatically recover transactions on stand-by.

### Scenario

After completed the deployment, you can :

#### Basic Demo

- Create an account on the e-commerce solution hosted on Azure.
- Order an item with a large asset of clothing.
- Go to your private platform of logistic
- Click on the "Refresh" button.
- Visualize and validate the order.

#### Hybrid Demo

- Process a shutdown on Azure Stack of your private application.
- Create an account on the e-commerce solution hosted on Azure.
- Order an item while the admin-platform is offline.
- Reboot your privation logistic site on Azure Stack.
- Go to your private platform of logistic.
- Click on the "Refresh" button.
- Recover and visualize all orders.

### How It Works ?

As mentioned, there is two main resources:
- An Application available from the Azure Marketplace: [SpreeCommerce](https://azuremarketplace.microsoft.com/en-us/marketplace/apps/bitnami.spree) // hosted on Azure
- An AppService wrote in NodeJS // hosted on Azure Stack

To enable connection between e-shop on Azure and your logistic platform on Azure Stack, we'll use a Microsoft Cloud feature: Azure Storage.
For each transaction made on your SpreeCommerce, there is an additional script (wrote in Python) which will use the SDK from Azure Storage to send "message" on a Azure Queue.
Azure Stack can connect synchronously on this Azure Queue and read/edit messages.
With this capability available on Azure, you can connect the both platforms and expose the hybrid potential of Azure Stack.

## Prerequisites

This repo is only dedicated for user who has an Azure Stack DK environnement (one-node) with the following solutions:

- A completed deployment of Azure Stack Development Kit
- A completed deployment of App Service Resource Provider on Azure Stack  
- A Windows Server VM Image for use when creating Virtual Machines for App Service on Azure Stack
- A server that's running SQL Server.
- A Visual Studio working with Azure Stack (on the MAS Host or with a dedicated VPN) 

You will find [here](https://docs.microsoft.com/en-us/azure/azure-stack/) the official guide of Azure Stack to enable your plateform correctly.

## Ressources

Resources below are relative to the deployement for enabling this hybrid scenario:

### [Azure Content]()
PaaS:
- SpreeCommerce from the Azure Marketplace
Tools:
- Python script with Azure Storage SDK
- Access to an Azure Storage for Queue Message

### [Azure Stack Content]()
PaaS: 
- Visual Studio Solution (NodeJS) for App Service

## Deployment of Scenario

### On Azure:

#### 1)Deploy SpreeCommerce resource from the Azure Marketplace
#### 2)[Find application credentials](https://docs.bitnami.com/azure/faq/#find_credentials) from SpreeCommerce
#### 3)[Connect](https://docs.bitnami.com/azure/faq/#connecting-with-an-ssh-client) with a SSH Client to SpreeCommerce resource with your credentials
#### 4)Copy the [Python Script](Python) on the bitnami console (C:/ Directory)
#### 5)Edit values in the Python Script: "account_name"; "account_key"; "queue_name" (Azure Storage Credentials from RG with SpreeCommerce)
#### 6)Launch the python script:
```powershell
python listening.py
```
### On Azure Stack:

#### 7)Open solution with Visual Studio and deploy it via FTP on your environment.
#### 8)Edit values from main.js file with Visual Studio: "account_name"; "account_key"; "queue_name" (Azure Storage Credentials from RG with SpreeCommerce)

---
_This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments._

