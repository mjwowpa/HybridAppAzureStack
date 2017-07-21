# Azure Stack Development Kit: Hybrid Scenario Demo

This project is meant for use with **Azure Stack Development Kit**. Azure Stack Technical Preview 3 Refresh users can still adapt the repo with [TP3-Refresh](https://github.com/Azure/AzureStack-Tools/tree/TP3-Refresh).

## Description

### Aim

This repo contains resources to illustrate the hybrid capability of Azure Stack.
With the same consistency of Azure, you'll be able to deploy a classic e-commerce solution on the Microsoft public Cloud and validate your orders on a private platform with Azure Stack.

### How It Works ?

To enable connection between e-shop on Azure and your logistic platform on Azure Stack, we'll use a Microsoft Cloud feature: Azure SDK Storage.
For each transaction made on your SpreeCommerce, there is an additional script which will use the SDK to send "message" on a Azure Queue.
Last but not least, Azure Stack can connect synchronously on this Azure Queue and edit messages.
With this capability available on Azure, you can connect the both platforms and begin to empower the hybrid potential of Azure Stack.

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

On Azure:

- Deploy an SpreeCommerce resource from the Azure Marketplace
- Copy the Python Script on the bitnami console
- Edit values in the Python Script: "account_name"; "account_key"; "queue_name" (Azure Storage Credentials from RG with SpreeCommerce)

On Azure Stack:

- Open solution with Visual Studio and deploy it via FTP on your environment.

---
_This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments._

