export interface SubLabItem {
  name: string
  videoUrl?: string
  driveUrl?: string
  scriptFile?: string
  lang?: string
}

export interface CatalogArcadeLab {
  name: string
  videoUrl?: string
  driveUrl?: string
  scriptFile?: string
  lang?: string
  note?: string
  claimUrl?: string
  isClaimBadge?: boolean
}

export interface CatalogArcadeGame {
  id: string
  name: string
  icon: string
  isExpired: boolean
  url?: string
  code?: string
  labs: CatalogArcadeLab[]
}

export interface CatalogSkillBadge {
  name: string
  url: string
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Introductory' | string
  isFastTrack: boolean
  videoUrl?: string
  driveUrl?: string
  scriptFile?: string
  lang?: string
  note?: string
  subLabs?: SubLabItem[]
}

export const JULY_ARCADE_GAMES: CatalogArcadeGame[] = [
  {
    "id": "game-adventure",
    "name": "Arcade Games Adventure (1 Poin)",
    "icon": "fa-solid fa-compass text-blue",
    "isExpired": true,
    "labs": [
      {
        "name": "Google AppSheet: Getting Started",
        "driveUrl": "https://drive.google.com/drive/folders/1W16uGEwHcygcRTI5Ksp1i2SOgZJ9_7Yn?usp=sharing",
        "scriptFile": "",
        "lang": ""
      },
      {
        "name": "Connect and Configure Data for your AppSheet App",
        "driveUrl": "https://drive.google.com/drive/folders/1gWgjXF9Zr5FycsDeDbER03K-WpRm8Zg7?usp=sharing",
        "scriptFile": "contacts.xlsx",
        "lang": "Excel Spreadsheet"
      },
      {
        "name": "Publish your AppSheet App",
        "driveUrl": "https://drive.google.com/drive/folders/1uXj8sQSZbKntT-kIMMf0twnHHqjz7sCU?usp=sharing",
        "scriptFile": "gsp1030(1).xlsx",
        "lang": "Excel Spreadsheet"
      },
      {
        "name": "App Building with AppSheet: Challenge Lab",
        "driveUrl": "https://drive.google.com/drive/folders/1FevQY1IHMMMfkY1OJL636iaEQvLuRS4O?usp=sharing",
        "scriptFile": "companies.xlsx",
        "lang": "Excel Spreadsheet"
      },
      {
        "name": "Cloud Run Functions: Qwik Start - Console",
        "videoUrl": "https://www.youtube.com/embed/2rQ5j9fUyi8",
        "scriptFile": "",
        "lang": ""
      },
      {
        "name": "Cloud Run Functions: Qwik Start - Command Line",
        "videoUrl": "https://www.youtube.com/embed/Np7csJrbr0s",
        "scriptFile": "",
        "lang": ""
      },
      {
        "name": "Cloud Run Functions: Qwik Start",
        "videoUrl": "https://www.youtube.com/embed/IEkywQ_a-2c",
        "scriptFile": "",
        "lang": ""
      },
      {
        "name": "Build Serverless Applications with Cloud Run Functions: Challenge Lab",
        "driveUrl": "https://drive.google.com/file/d/1_K-ki5BIw8iXf6p3DrI7N_3NDi_tvOnr/view?usp=sharing",
        "scriptFile": "Build Serverless Applications with Cloud Run Functions Challenge Lab.txt",
        "lang": "Shell Script"
      }
    ]
  },
  {
    "id": "game-voyage",
    "name": "Arcade Games Voyage (1 Poin)",
    "icon": "fa-solid fa-ship text-red",
    "isExpired": true,
    "labs": [
      {
        "name": "Enabling Sensitive Data Protection Discovery for Cloud Storage",
        "videoUrl": "https://www.youtube.com/embed/e9MgNkNbOUE",
        "scriptFile": "script.txt",
        "lang": "Shell Script"
      },
      {
        "name": "Google Cloud Storage - Bucket Lock",
        "videoUrl": "https://www.youtube.com/embed/tvzzzPMMbyY",
        "scriptFile": "",
        "lang": ""
      },
      {
        "name": "Enabling Sensitive Data Protection Discovery for BigQuery",
        "videoUrl": "https://www.youtube.com/embed/fIdmx0j3OgE",
        "scriptFile": "",
        "lang": ""
      },
      {
        "name": "Discover and Protect Sensitive Data Across Your Ecosystem: Challenge Lab",
        "videoUrl": "https://www.youtube.com/embed/TwCRWl41z7o",
        "driveUrl": "https://github.com/abhishekmsm51w-star/gcpbyabhi/blob/main/Discover%20and%20Protect%20Sensitive%20Data%20Across%20Your%20Ecosystem%20Challenge%20Lab/lab.md",
        "scriptFile": "",
        "lang": ""
      },
      {
        "name": "Cloud Storage: Qwik Start - CLI/SDK",
        "videoUrl": "https://www.youtube.com/embed/017pF1DefFo",
        "scriptFile": "",
        "lang": ""
      },
      {
        "name": "APIs Explorer: Cloud Storage",
        "videoUrl": "https://www.youtube.com/embed/pfkWHLad-E8",
        "scriptFile": "APIs Explorer Cloud Storage.txt",
        "lang": "JSON Request"
      },
      {
        "name": "Introduction to APIs in Google Cloud",
        "videoUrl": "https://www.youtube.com/embed/VXGPHm4XPRQ",
        "scriptFile": "Introduction to APIs in Google Cloud.txt",
        "lang": "Shell Script"
      },
      {
        "name": "Use APIs to Work with Cloud Storage: Challenge Lab",
        "videoUrl": "https://www.youtube.com/embed/hoQkLb5prS8",
        "scriptFile": "Use APIs to Work with Cloud Storage Challenge Lab.txt",
        "lang": "Shell Script",
        "note": "Sama seperti yang di video, berkas ini disajikan dalam bentuk aslinya agar aman digunakan."
      }
    ]
  },
  {
    "id": "game-trail",
    "name": "Arcade Games Trail (1 Poin)",
    "icon": "fa-solid fa-route text-yellow",
    "isExpired": true,
    "labs": []
  },
  {
    "id": "game-basecamp",
    "name": "Arcade Games Base Camp (1 Poin)",
    "icon": "fa-solid fa-campground text-blue",
    "isExpired": true,
    "labs": []
  },
  {
    "id": "game-safespaces",
    "name": "Arcade Games Safe Spaces (1 Poin)",
    "icon": "fa-solid fa-shield-halved text-green",
    "isExpired": true,
    "labs": []
  },
  {
    "id": "game-datamesh",
    "name": "Arcade Games Data Mesh Architect (1 Poin)",
    "icon": "fa-solid fa-network-wired text-red",
    "isExpired": true,
    "labs": []
  }
]

export const AUGUST_ARCADE_GAMES: CatalogArcadeGame[] = [
  {
    "id": "game-aug-network",
    "name": "Arcade Simulator: Network Security Engineer (1 Poin)",
    "icon": "fa-solid fa-shield-halved text-green",
    "url": "https://www.skills.google/games/7397?utm_source=googleskills&utm_medium=lp&utm_campaign=specgame-Aug-arcade26",
    "code": "1q-network-51470",
    "isExpired": false,
    "labs": [
      {
        "name": "IAM Custom Roles",
        "driveUrl": "https://drive.google.com/drive/folders/19jIe4qYwBbhhdjFztror0HtJ8iELs6uv?usp=sharing",
        "scriptFile": "iam custom roles.txt",
        "lang": "Text Script"
      },
      {
        "name": "Configuring IAM Permissions with gcloud",
        "videoUrl": "https://www.youtube.com/embed/9yrOuoWjQ70"
      },
      {
        "name": "User Authentication: Identity-Aware Proxy",
        "videoUrl": "https://www.youtube.com/embed/qrHNwUIFhT8"
      },
      {
        "name": "Privileged Access with IAM: Challenge Lab",
        "videoUrl": "https://www.youtube.com/embed/S8_Bk6tE3as"
      },
      {
        "name": "Claim Skill Badge: Privileged Access with IAM",
        "claimUrl": "https://www.skills.google/course_templates/1337?utm_source=googleskills&utm_medium=gametemplate&utm_campaign=simulator-august-arcade26",
        "isClaimBadge": true
      },
      {
        "name": "Establish Hybrid Network Connectivity with NCC",
        "videoUrl": "https://www.youtube.com/embed/wSDlH-IRnjg",
        "driveUrl": "https://horizon.orbitofops.com/establish-hybrid-network-connectivity-with-ncc?ref=youtube",
        "note": "Resource & Panduan: horizon.orbitofops.com"
      },
      {
        "name": "Establish VPC to VPC Connectivity using NCC",
        "videoUrl": "https://www.youtube.com/embed/kO-71QhxSMA"
      },
      {
        "name": "Establish Site to Site Connectivity with HA-VPN using NCC",
        "videoUrl": "https://www.youtube.com/embed/TUMkUppl8q4"
      },
      {
        "name": "Connecting Cloud Networks with NCC: Challenge Lab",
        "videoUrl": "https://www.youtube.com/embed/dIh7JkuEetk",
        "driveUrl": "https://horizon.orbitofops.com/connecting-cloud-networks-with-ncc?ref=youtube",
        "note": "Resource & Panduan: horizon.orbitofops.com"
      },
      {
        "name": "Claim Skill Badge: Connect Cloud Networks with NCC",
        "claimUrl": "https://www.skills.google/course_templates/1364?utm_source=googleskills&utm_medium=gametemplate&utm_campaign=simulator-august-arcade26",
        "isClaimBadge": true
      }
    ]
  },
  {
    "id": "game-aug-trail",
    "name": "Arcade Trail: Cloud Delivery Systems (1 Poin)",
    "icon": "fa-solid fa-route text-yellow",
    "url": "https://www.skills.google/games/7396?utm_source=googleskills&utm_medium=lp&utm_campaign=trail-Aug-arcade26",
    "code": "1q-delivery-31058",
    "isExpired": false,
    "labs": [
      {
        "name": "Develop No-Code Chat Apps with AppSheet",
        "videoUrl": "https://www.youtube.com/embed/ChAzLCJHdsA",
        "driveUrl": "https://docs.google.com/spreadsheets/d/1X4wbmHgGqgEh2p7PvXFHug-2y2jAQ436/edit?usp=sharing&ouid=105725403435718564993&rtpof=true&sd=true"
      },
      {
        "name": "Introduction to Google Chat Bots with Apps Script",
        "videoUrl": "https://www.youtube.com/embed/-CNm0DXri8g"
      },
      {
        "name": "Google Apps Script: Access Google Sheets, Maps & Gmail in 4 Lines of Code",
        "videoUrl": "https://www.youtube.com/embed/1jHmm4et3y8"
      },
      {
        "name": "Develop with Apps Script and AppSheet: Challenge Lab",
        "videoUrl": "https://www.youtube.com/embed/f2E4bIIbB-0",
        "driveUrl": "https://horizon.orbitofops.com/develop-with-apps-script-and-appsheet?ref=youtube"
      },
      {
        "name": "Claim Skill Badge: Develop with Apps Script and AppSheet",
        "claimUrl": "https://www.skills.google/course_templates/715?utm_source=googleskills&utm_medium=gametemplate&utm_campaign=trail-august-arcade26",
        "isClaimBadge": true
      },
      {
        "name": "Artifact Registry: Qwik Start",
        "videoUrl": "https://www.youtube.com/embed/qAP4Bd9ogSk"
      },
      {
        "name": "Google Kubernetes Engine Pipeline using Cloud Build",
        "note": "Coming Soon / Diupdate Berkala"
      },
      {
        "name": "Continuous Delivery with Google Cloud Deploy",
        "videoUrl": "https://www.youtube.com/embed/ak3HQH8ltik"
      },
      {
        "name": "Implement CI/CD Pipelines on Google Cloud: Challenge Lab",
        "note": "Coming Soon / Diupdate Berkala"
      },
      {
        "name": "Claim Skill Badge: Implement CI/CD Pipelines in Google Cloud",
        "claimUrl": "https://www.skills.google/course_templates/691?utm_source=googleskills&utm_medium=gametemplate&utm_campaign=trail-august-arcade26",
        "isClaimBadge": true
      }
    ]
  },
  {
    "id": "game-aug-spans",
    "name": "Spans and Plans (1 Poin)",
    "icon": "fa-solid fa-diagram-project text-yellow",
    "url": "https://www.skills.google/games/7399?utm_source=googleskills&utm_medium=lp&utm_campaign=Special-Aug-arcade26",
    "code": "1q-schema-27083",
    "isExpired": false,
    "labs": [
      {
        "name": "Cloud Spanner - Database Fundamentals",
        "driveUrl": "https://drive.google.com/file/d/1I4Gz9vJVPBJRmqSQGNYiERk8AQbI0H8e/view?usp=sharing"
      },
      {
        "name": "Cloud Spanner - Loading Data and Performing Backups",
        "videoUrl": "https://www.youtube.com/embed/zh6hi9pDQSk"
      },
      {
        "name": "Spanner - Defining Schemas and Understanding Query Plans",
        "videoUrl": "https://www.youtube.com/embed/0aOpx7qLqyY"
      },
      {
        "name": "Create and Manage Cloud Spanner Instances: Challenge Lab",
        "videoUrl": "https://www.youtube.com/embed/_Z1cksiD_lc",
        "driveUrl": "https://docs.google.com/document/d/1Md5Dw8q2_AWdyIuScieO4nx-qNZlIxTOHrzOIMUCg0g/edit?tab=t.0"
      },
      {
        "name": "Claim Skill Badge: Create and Manage Cloud Spanner Instances",
        "claimUrl": "https://www.skills.google/course_templates/643?utm_source=googleskills&utm_medium=gametemplate&utm_campaign=spl-game-august-arcade26",
        "isClaimBadge": true
      },
      {
        "name": "Cloud Run Functions: Qwik Start - Console",
        "videoUrl": "https://www.youtube.com/embed/wp11IVx1eCM",
        "note": "Jika terlalu cepat bisa diatur kecepatan videonya."
      },
      {
        "name": "API Gateway: Qwik Start",
        "videoUrl": "https://www.youtube.com/embed/ypwF0RdN0qU"
      },
      {
        "name": "Pub/Sub: Qwik Start - Console",
        "videoUrl": "https://www.youtube.com/embed/qBsTp-UIMxs"
      },
      {
        "name": "Deploy and Secure Serverless APIs with API Gateway: Challenge Lab",
        "videoUrl": "https://www.youtube.com/embed/buedtvAhZ5o"
      },
      {
        "name": "Claim Skill Badge: Deploy and Secure Serverless APIs with API Gateway",
        "claimUrl": "https://www.skills.google/course_templates/662?utm_source=googleskills&utm_medium=gametemplate&utm_campaign=spl-game-august-arcade26",
        "isClaimBadge": true
      }
    ]
  },
  {
    "id": "game-aug-sheets",
    "name": "Arcade Voyage: Google Sheets (1 Poin)",
    "icon": "fa-solid fa-file-excel text-green",
    "url": "https://www.skills.google/games/7398?utm_source=googleskills&utm_medium=lp&utm_campaign=voyage-Aug-arcade26",
    "code": "1q-sheets-29185",
    "isExpired": false,
    "labs": [
      {
        "name": "Knowledge Catalog: Qwik Start - Console",
        "videoUrl": "https://www.youtube.com/embed/SHD0EbgdEkI",
        "note": "Jika terlalu cepat bisa diatur kecepatan videonya."
      },
      {
        "name": "Knowledge Catalog: Qwik Start - Command Line",
        "videoUrl": "https://www.youtube.com/embed/VwwTC7HBJXw"
      },
      {
        "name": "Create and Add Aspects to Knowledge Catalog Assets",
        "videoUrl": "https://www.youtube.com/embed/NWlP-7IC8Q4"
      },
      {
        "name": "Organize and Govern Data with Knowledge Catalog: Challenge Lab",
        "videoUrl": "https://www.youtube.com/embed/3OHoiOYAgIU"
      },
      {
        "name": "Claim Skill Badge: Organize and Manage Data with Dataplex",
        "claimUrl": "https://www.skills.google/course_templates/726?utm_source=googleskills&utm_medium=gametemplate&utm_campaign=voyage-august-arcade26",
        "isClaimBadge": true
      },
      {
        "name": "Use Charts in Google Sheets",
        "videoUrl": "https://www.youtube.com/embed/obfrIcOmZMI",
        "driveUrl": "https://github.com/Itsabhishek7py/GoogleCloudSkillsboost/tree/main/Use%20Charts%20in%20Google%20Sheets"
      },
      {
        "name": "Validate Data in Google Sheets",
        "videoUrl": "https://www.youtube.com/embed/On81tKBLBBw",
        "driveUrl": "https://github.com/Itsabhishek7py/GoogleCloudSkillsboost/blob/main/Validate%20Data%20in%20Google%20Sheets/Drabhishek1062.xlsx"
      },
      {
        "name": "Finding Data in Google Sheets",
        "videoUrl": "https://www.youtube.com/embed/vxbkyqTjXiI",
        "driveUrl": "https://github.com/Itsabhishek7py/GoogleCloudSkillsboost/blob/main/Finding%20Data%20in%20Google%20Sheets/abhishekdr1063.xlsx"
      },
      {
        "name": "Use Functions, Formulas, and Charts in Google Sheets: Challenge Lab",
        "videoUrl": "https://www.youtube.com/embed/DWkLKkzboLs",
        "driveUrl": "https://github.com/Itsabhishek7py/GoogleCloudSkillsboost/tree/main/Files/Use%20Functions%2C%20Formulas%2C%20and%20Charts%20in%20Google%20Sheets%3A%20Challenge%20Lab"
      },
      {
        "name": "Claim Skill Badge: Use Functions, Formulas, and Charts in Google Sheets",
        "claimUrl": "https://www.skills.google/course_templates/776?utm_source=googleskills&utm_medium=gametemplate&utm_campaign=voyage-august-arcade26",
        "isClaimBadge": true
      }
    ]
  },
  {
    "id": "game-aug-basecamp",
    "name": "Arcade Base Camp August 2026 (1 Poin)",
    "icon": "fa-solid fa-campground text-blue",
    "url": "https://www.skills.google/games/7394?utm_source=googleskills&utm_medium=lp&utm_campaign=basecamp-Aug-arcade26",
    "code": "1q-basecamp-10219",
    "isExpired": false,
    "labs": [
      {
        "name": "Cloud Natural Language API: Qwik Start",
        "videoUrl": "https://www.youtube.com/embed/I0Ybwae59ts"
      },
      {
        "name": "Using the Natural Language API from Google Docs",
        "videoUrl": "https://www.youtube.com/embed/xGOC-_48xiA"
      },
      {
        "name": "Entity and Sentiment Analysis with the Natural Language API",
        "videoUrl": "https://www.youtube.com/embed/6FMraB49GH4"
      },
      {
        "name": "Analyze Sentiment with Natural Language API: Challenge Lab",
        "videoUrl": "https://www.youtube.com/embed/8ZKQCncnERg"
      },
      {
        "name": "Claim Skill Badge: Analyze Sentiment with Natural Language API",
        "claimUrl": "https://www.skills.google/course_templates/667?utm_source=googleskills&utm_medium=gametemplate&utm_campaign=basecamp-august-arcade26ade26",
        "isClaimBadge": true
      },
      {
        "name": "Cloud Monitoring: Qwik Start",
        "videoUrl": "https://www.youtube.com/embed/IY0UTPctU3I"
      },
      {
        "name": "Monitoring and Logging for Cloud Run Functions",
        "videoUrl": "https://www.youtube.com/embed/LBSE8unqhK4"
      },
      {
        "name": "Monitor an Apache Web Server using Ops Agent",
        "videoUrl": "https://www.youtube.com/embed/fopVMRO0OLI"
      },
      {
        "name": "Monitoring in Google Cloud: Challenge Lab",
        "videoUrl": "https://www.youtube.com/embed/omDAvsVfDkQ"
      },
      {
        "name": "Claim Skill Badge: Monitoring in Google Cloud",
        "claimUrl": "https://www.skills.google/course_templates/747?utm_source=googleskills&utm_medium=gametemplate&utm_campaign=basecamp-august-arcade26",
        "isClaimBadge": true
      }
    ]
  },
  {
    "id": "game-aug-datavault",
    "name": "Arcade Adventure: Data Vault (1 Poin)",
    "icon": "fa-solid fa-vault text-blue",
    "url": "https://www.skills.google/games/7395?utm_source=googleskills&utm_medium=lp&utm_campaign=adv-Aug-arcade26",
    "code": "1q-datamgt-92372",
    "isExpired": false,
    "labs": [
      {
        "name": "Debug Apps on Google Kubernetes Engine",
        "videoUrl": "https://www.youtube.com/embed/_aJiYi_bt2Y"
      },
      {
        "name": "Collect Metrics from Exporters using the Managed Service for Prometheus",
        "videoUrl": "https://www.youtube.com/embed/-A3zxDSwqtw"
      },
      {
        "name": "Managing Deployments Using Kubernetes Engine",
        "videoUrl": "https://www.youtube.com/embed/ZehWWOZQQD4"
      },
      {
        "name": "Manage Kubernetes in Google Cloud: Challenge Lab",
        "videoUrl": "https://www.youtube.com/embed/gGiSuO1H4OA",
        "driveUrl": "https://arcade.cloudhustlers.in/solution/GSP510-manage-kubernetes-challenge",
        "note": "Resource & Panduan: arcade.cloudhustlers.in"
      },
      {
        "name": "Claim Skill Badge: Manage Kubernetes in Google Cloud",
        "claimUrl": "https://www.skills.google/course_templates/783?utm_source=googleskills&utm_medium=gametemplate&utm_campaign=adv-august-arcade26",
        "isClaimBadge": true
      },
      {
        "name": "Data Publishing on BigQuery using Authorized Views for Data Sharing Partners",
        "videoUrl": "https://www.youtube.com/embed/iXq7GEXGxps"
      },
      {
        "name": "Analytics as a Service for Data Sharing Partners",
        "videoUrl": "https://www.youtube.com/embed/-06uEHtuAa0"
      },
      {
        "name": "Consuming Customer Specific Datasets from Data Sharing Partners using BigQuery",
        "videoUrl": "https://www.youtube.com/embed/idpdSAMs-a8"
      },
      {
        "name": "Share Data using Google Data Cloud: Challenge Lab",
        "videoUrl": "https://www.youtube.com/embed/Vilq-1M_2UM"
      },
      {
        "name": "Claim Skill Badge: Share Data using Google Data Cloud",
        "claimUrl": "https://www.skills.google/course_templates/657?utm_source=googleskills&utm_medium=gametemplate&utm_campaign=adv-august-arcade26",
        "isClaimBadge": true
      }
    ]
  },
  {
    "id": "game-aug-retrail",
    "name": "Arcade Re-Trail: Vaults & Vectors (1 Poin)",
    "icon": "fa-solid fa-repeat text-green",
    "url": "https://www.skills.google/games/7426",
    "code": "1q-vaults-39213",
    "isExpired": false,
    "labs": []
  }
]

export const CATALOG_SKILL_BADGES: CatalogSkillBadge[] = [
  {
    "name": "Use Agent Skills with Multi-Agent Systems",
    "url": "https://www.skills.google/course_templates/1842?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Intermediate",
    "isFastTrack": true,
    "videoUrl": "",
    "scriptFile": "",
    "lang": "",
    "note": "",
    "driveUrl": ""
  },
  {
    "name": "Design and Implement Network Security in Google Cloud",
    "url": "https://www.skills.google/course_templates/1736?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Intermediate",
    "isFastTrack": true,
    "videoUrl": "",
    "scriptFile": "",
    "lang": "",
    "note": "",
    "driveUrl": ""
  },
  {
    "name": "Create Your First Gemini Enterprise Application",
    "url": "https://www.skills.google/course_templates/1586?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Beginner",
    "isFastTrack": false,
    "videoUrl": "",
    "scriptFile": "",
    "lang": "",
    "note": "Tinggal kerjakan bagian assessment saja dan raih minimal 80% score",
    "driveUrl": ""
  },
  {
    "name": "Develop AI-Powered Prototypes in Google AI Studio",
    "url": "https://www.skills.google/course_templates/1426?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Beginner",
    "isFastTrack": true,
    "videoUrl": "https://www.youtube.com/embed/_3sqd3iv4zg",
    "driveUrl": "https://github.com/Itsabhishek7py/GoogleCloudSkillsboost/blob/main/Develop%20AI-Powered%20Prototypes%20in%20Google%20AI%20Studio%20Challenge%20Lab/lab.md",
    "scriptFile": "",
    "lang": "",
    "note": ""
  },
  {
    "name": "The Basics of Google Cloud Compute",
    "url": "https://www.skills.google/course_templates/754?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Beginner",
    "isFastTrack": false,
    "videoUrl": "https://www.youtube.com/embed/U2eelCr8SGw",
    "driveUrl": "https://horizon.orbitofops.com/the-basics-of-google-cloud-compute?ref=youtube",
    "scriptFile": "",
    "lang": "",
    "note": "Skill Badge ini Tidak Fast Track. Kamu harus menyelesaikan seluruh 4 lab pendahuluan.",
    "subLabs": [
      {
        "name": "Lab 1: Create a Virtual Machine",
        "videoUrl": "https://www.youtube.com/embed/v6pqd6S39qU"
      },
      {
        "name": "Lab 2: Creating a Persistent Disk",
        "videoUrl": "https://www.youtube.com/embed/Yl-9n9UFnB8"
      },
      {
        "name": "Lab 3: Host a Web App on Compute Engine",
        "videoUrl": "https://www.youtube.com/embed/T_qDnp4HRnQ"
      },
      {
        "name": "Lab 4: Challenge Lab",
        "videoUrl": "https://www.youtube.com/embed/U2eelCr8SGw",
        "driveUrl": "https://horizon.orbitofops.com/the-basics-of-google-cloud-compute?ref=youtube"
      }
    ]
  },
  {
    "name": "Implement Event-Driven Messaging and Automation Workflows",
    "url": "https://www.skills.google/course_templates/728?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Beginner",
    "isFastTrack": true,
    "videoUrl": "https://www.youtube.com/embed/GpzscfvZIzk",
    "scriptFile": "",
    "lang": "",
    "driveUrl": "",
    "note": ""
  },
  {
    "name": "Implement Cloud Storage and Data Protection Solutions",
    "url": "https://www.skills.google/course_templates/725?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Beginner",
    "isFastTrack": true,
    "videoUrl": "https://www.youtube.com/embed/947G_fTB2_o",
    "scriptFile": "",
    "lang": "",
    "driveUrl": "",
    "note": ""
  },
  {
    "name": "Create a Streaming Data Lake on Cloud Storage",
    "url": "https://www.skills.google/course_templates/705?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Beginner",
    "isFastTrack": false,
    "videoUrl": "",
    "scriptFile": "",
    "lang": "",
    "driveUrl": "",
    "note": ""
  },
  {
    "name": "Deploy and Manage Applications on Google App Engine",
    "url": "https://www.skills.google/course_templates/671?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Beginner",
    "isFastTrack": true,
    "videoUrl": "",
    "scriptFile": "",
    "lang": "",
    "driveUrl": "",
    "note": ""
  },
  {
    "name": "Implement Speech and Language Solutions with Pre-trained APIs",
    "url": "https://www.skills.google/course_templates/700?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Beginner",
    "isFastTrack": true,
    "videoUrl": "https://www.youtube.com/embed/4oTfLBUfRIo",
    "driveUrl": "https://docs.google.com/document/d/1wwe_isf9ZxhXNy86-evmqoKtI9dE49dfqEqI3suG3F0/edit?tab=t.0",
    "scriptFile": "",
    "lang": "",
    "note": ""
  },
  {
    "name": "Using the Google Cloud Speech API",
    "url": "https://www.skills.google/course_templates/756?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Beginner",
    "isFastTrack": true,
    "videoUrl": "https://www.youtube.com/embed/fVFbGVncpFg",
    "scriptFile": "",
    "lang": "",
    "driveUrl": "https://tinyurl.com/yjkxm5uk",
    "note": ""
  },
  {
    "name": "Analyze Speech and Language with Google APIs",
    "url": "https://www.skills.google/course_templates/634?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Beginner",
    "isFastTrack": true,
    "videoUrl": "https://www.youtube.com/embed/KSStnnG5Go4",
    "scriptFile": "",
    "lang": "",
    "driveUrl": "https://docs.google.com/document/d/176gnT03B9gC9bsKPITE9wi74xb7XQrURsnSCz4oqnyE/edit?tab=t.0",
    "note": ""
  },
  {
    "name": "Store, Process, and Manage Data on Google Cloud - Console",
    "url": "https://www.skills.google/course_templates/658?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Beginner",
    "isFastTrack": true,
    "videoUrl": "",
    "scriptFile": "",
    "lang": "",
    "driveUrl": "",
    "note": ""
  },
  {
    "name": "Store, Process, and Manage Data on Google Cloud - Command Line",
    "url": "https://www.skills.google/course_templates/659?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Beginner",
    "isFastTrack": true,
    "videoUrl": "https://www.youtube.com/embed/MIVW6RddKjI",
    "scriptFile": "",
    "lang": "",
    "driveUrl": "https://tinyurl.com/5dax3t3d",
    "note": ""
  },
  {
    "name": "Migrate MySQL Data to Cloud SQL Using Database Migration Service",
    "url": "https://www.skills.google/course_templates/629?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Beginner",
    "isFastTrack": true,
    "videoUrl": "https://www.youtube.com/embed/0gg3JhjK_ik",
    "scriptFile": "",
    "lang": "",
    "driveUrl": "",
    "note": ""
  },
  {
    "name": "Get Started with Sensitive Data Protection",
    "url": "https://www.skills.google/course_templates/750?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Beginner",
    "isFastTrack": true,
    "videoUrl": "https://www.youtube.com/embed/uljYOBYgzOc",
    "scriptFile": "",
    "lang": "",
    "driveUrl": "https://horizon.orbitofops.com/get-started-with-sensitive-data-protection?ref=youtube",
    "note": ""
  },
  {
    "name": "Analyze Images with the Cloud Vision API",
    "url": "https://www.skills.google/course_templates/633?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Beginner",
    "isFastTrack": true,
    "videoUrl": "https://www.youtube.com/embed/j65X-ftvaeY",
    "scriptFile": "",
    "lang": "",
    "driveUrl": "https://horizon.orbitofops.com/analyze-images-with-the-cloud-vision-api?ref=youtube",
    "note": ""
  },
  {
    "name": "Build Event-Driven Applications with Eventarc",
    "url": "https://www.skills.google/course_templates/727?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Beginner",
    "isFastTrack": true,
    "videoUrl": "",
    "scriptFile": "",
    "lang": "",
    "driveUrl": "",
    "note": ""
  },
  {
    "name": "Configure Service Accounts and IAM Roles for Google Cloud",
    "url": "https://www.skills.google/course_templates/702?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Beginner",
    "isFastTrack": true,
    "videoUrl": "https://www.youtube.com/embed/Ftck0wUDvaY",
    "driveUrl": "https://horizon.orbitofops.com/configure-service-accounts-and-iam-roles-for-google-cloud?ref=youtube",
    "scriptFile": "",
    "lang": "",
    "note": ""
  },
  {
    "name": "Get Started with App Development using Gemini Code Assist",
    "url": "https://www.skills.google/course_templates/1399?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Beginner",
    "isFastTrack": true,
    "videoUrl": "",
    "scriptFile": "",
    "lang": "",
    "driveUrl": "",
    "note": ""
  },
  {
    "name": "Implement Cloud Security Fundamentals in Google Cloud",
    "url": "https://www.skills.google/course_templates/645?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Beginner",
    "isFastTrack": true,
    "videoUrl": "",
    "scriptFile": "",
    "lang": "",
    "driveUrl": "",
    "note": ""
  },
  {
    "name": "Engineer AI Agents with Agent Development Kit (ADK)",
    "url": "https://www.skills.google/course_templates/1596?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Intermediate",
    "isFastTrack": true,
    "videoUrl": "",
    "scriptFile": "",
    "lang": "",
    "driveUrl": "",
    "note": ""
  },
  {
    "name": "Build Useful AI Applications with Gemini and Imagen",
    "url": "https://www.skills.google/course_templates/1076?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Intermediate",
    "isFastTrack": false,
    "videoUrl": "",
    "scriptFile": "",
    "lang": "",
    "driveUrl": "",
    "note": ""
  },
  {
    "name": "Build a Smart Cloud Application with Vibe Coding and MCP",
    "url": "https://www.skills.google/course_templates/1459?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Intermediate",
    "isFastTrack": true,
    "videoUrl": "",
    "scriptFile": "",
    "lang": "",
    "driveUrl": "",
    "note": ""
  },
  {
    "name": "Implement Cloud Collaboration and Productivity Workflows",
    "url": "https://www.skills.google/course_templates/676?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Intermediate",
    "isFastTrack": true,
    "videoUrl": "https://www.youtube.com/embed/3j0U2ep-Oog",
    "scriptFile": "",
    "lang": "",
    "driveUrl": "",
    "note": ""
  },
  {
    "name": "Analyze BigQuery Data in Connected Sheets",
    "url": "https://www.skills.google/course_templates/632?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Intermediate",
    "isFastTrack": true,
    "videoUrl": "",
    "scriptFile": "",
    "lang": "",
    "driveUrl": "",
    "note": ""
  },
  {
    "name": "Streaming Analytics into BigQuery",
    "url": "https://www.skills.google/course_templates/752?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Intermediate",
    "isFastTrack": true,
    "videoUrl": "",
    "scriptFile": "",
    "lang": "",
    "driveUrl": "",
    "note": ""
  },
  {
    "name": "Create a Secure Data Lake on Cloud Storage",
    "url": "https://www.skills.google/course_templates/704?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Intermediate",
    "isFastTrack": true,
    "videoUrl": "",
    "scriptFile": "",
    "lang": "",
    "driveUrl": "",
    "note": ""
  },
  {
    "name": "Secure Lakehouse Data",
    "url": "https://www.skills.google/course_templates/751?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Intermediate",
    "isFastTrack": true,
    "videoUrl": "",
    "scriptFile": "",
    "lang": "",
    "driveUrl": "",
    "note": ""
  },
  {
    "name": "Enrich Metadata and Discovery of Lakehouse Data",
    "url": "https://www.skills.google/course_templates/753?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Intermediate",
    "isFastTrack": true,
    "videoUrl": "",
    "scriptFile": "",
    "lang": "",
    "driveUrl": "",
    "note": ""
  },
  {
    "name": "Monitor and Manage Google Cloud Resources",
    "url": "https://www.skills.google/course_templates/653?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Intermediate",
    "isFastTrack": true,
    "videoUrl": "",
    "scriptFile": "",
    "lang": "",
    "driveUrl": "",
    "note": ""
  },
  {
    "name": "Monitor and Log with Google Cloud Observability",
    "url": "https://www.skills.google/course_templates/749?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Intermediate",
    "isFastTrack": true,
    "videoUrl": "",
    "scriptFile": "",
    "lang": "",
    "driveUrl": "",
    "note": ""
  },
  {
    "name": "Set Up a Google Cloud Network",
    "url": "https://www.skills.google/course_templates/641?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Intermediate",
    "isFastTrack": true,
    "videoUrl": "",
    "scriptFile": "",
    "lang": "",
    "driveUrl": "",
    "note": ""
  },
  {
    "name": "Integrate BigQuery Data and Google Workspace using Apps Script",
    "url": "https://www.skills.google/course_templates/737?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Intermediate",
    "isFastTrack": true,
    "videoUrl": "https://www.youtube.com/embed/k0vXaixK6MI",
    "driveUrl": "https://github.com/Itsabhishek7py/GoogleCloudSkillsboost/blob/main/Integrate%20BigQuery%20Data%20and%20Google%20Workspace%20using%20Apps%20Script%3A%20Challenge%20Lab.md",
    "scriptFile": "",
    "lang": "",
    "note": ""
  },
  {
    "name": "Engineer Data for Predictive Modeling with BigQuery ML",
    "url": "https://www.skills.google/course_templates/627?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Intermediate",
    "isFastTrack": true,
    "videoUrl": "",
    "scriptFile": "",
    "lang": "",
    "driveUrl": "",
    "note": ""
  },
  {
    "name": "Implement DevOps Workflows in Google Cloud",
    "url": "https://www.skills.google/course_templates/716?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Intermediate",
    "isFastTrack": true,
    "videoUrl": "",
    "scriptFile": "",
    "lang": "",
    "driveUrl": "",
    "note": ""
  },
  {
    "name": "Create ML Models with BigQuery ML",
    "url": "https://www.skills.google/course_templates/626?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Intermediate",
    "isFastTrack": true,
    "videoUrl": "",
    "scriptFile": "",
    "lang": "",
    "driveUrl": "",
    "note": ""
  },
  {
    "name": "Build a Website on Google Cloud",
    "url": "https://www.skills.google/course_templates/638?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Intermediate",
    "isFastTrack": true,
    "videoUrl": "",
    "scriptFile": "",
    "lang": "",
    "driveUrl": "",
    "note": ""
  },
  {
    "name": "Manage Kubernetes in Google Cloud",
    "url": "https://www.skills.google/course_templates/783?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Intermediate",
    "isFastTrack": true,
    "videoUrl": "https://www.youtube.com/embed/gGiSuO1H4OA",
    "driveUrl": "https://arcade.cloudhustlers.in/solution/GSP510-manage-kubernetes-challenge",
    "scriptFile": "",
    "lang": "",
    "note": ""
  },
  {
    "name": "Share Data Using Google Data Cloud",
    "url": "https://www.skills.google/course_templates/657?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Intermediate",
    "isFastTrack": true,
    "videoUrl": "https://www.youtube.com/embed/ZWajg_H4Mss",
    "scriptFile": "",
    "lang": "",
    "driveUrl": "",
    "note": ""
  },
  {
    "name": "Use Machine Learning APIs on Google Cloud",
    "url": "https://www.skills.google/course_templates/630?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Intermediate",
    "isFastTrack": true,
    "videoUrl": "https://www.youtube.com/embed/I8DzLVQz_qk",
    "scriptFile": "",
    "lang": "",
    "driveUrl": "",
    "note": ""
  },
  {
    "name": "Monitor Environments with Google Cloud Managed Service for Prometheus",
    "url": "https://www.skills.google/course_templates/761?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Intermediate",
    "isFastTrack": true,
    "videoUrl": "https://www.youtube.com/embed/Vh74HycGnLA",
    "driveUrl": "https://docs.google.com/document/d/1zxmP6St8AuFlxdbQXWxBUB4D_JttZkuqoEKQzxUFyng/edit?tab=t.0",
    "scriptFile": "",
    "lang": "",
    "note": ""
  },
  {
    "name": "Organize and Manage Data with Dataplex",
    "url": "https://www.skills.google/course_templates/726?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Intermediate",
    "isFastTrack": true,
    "videoUrl": "",
    "scriptFile": "",
    "lang": "",
    "driveUrl": "",
    "note": ""
  },
  {
    "name": "Analyze Sentiment with Natural Language API",
    "url": "https://www.skills.google/course_templates/667?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Intermediate",
    "isFastTrack": true,
    "videoUrl": "https://www.youtube.com/embed/8ZKQCncnERg",
    "driveUrl": "https://physalinotes.vercel.app/#view",
    "scriptFile": "",
    "lang": "",
    "note": ""
  },
  {
    "name": "Develop with Apps Script and AppSheet",
    "url": "https://www.skills.google/course_templates/715?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Intermediate",
    "isFastTrack": true,
    "videoUrl": "",
    "driveUrl": "",
    "scriptFile": "",
    "lang": "",
    "note": ""
  },
  {
    "name": "Use APIs to Manage Cloud Storage",
    "url": "https://www.skills.google/course_templates/755?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Intermediate",
    "isFastTrack": true,
    "videoUrl": "",
    "scriptFile": "",
    "lang": "",
    "driveUrl": "",
    "note": ""
  },
  {
    "name": "Monitoring in Google Cloud",
    "url": "https://www.skills.google/course_templates/747?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Intermediate",
    "isFastTrack": true,
    "videoUrl": "",
    "scriptFile": "",
    "lang": "",
    "driveUrl": "",
    "note": ""
  },
  {
    "name": "Orchestrate Multi-agent Workflows with Gemini Enterprise",
    "url": "https://www.skills.google/course_templates/1682?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Intermediate",
    "isFastTrack": false,
    "videoUrl": "",
    "scriptFile": "",
    "lang": "",
    "driveUrl": "",
    "note": ""
  },
  {
    "name": "Connect Cloud Networks with NCC",
    "url": "https://www.skills.google/course_templates/1364?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Intermediate",
    "isFastTrack": true,
    "videoUrl": "",
    "driveUrl": "",
    "scriptFile": "",
    "lang": "",
    "note": ""
  },
  {
    "name": "Privileged Access with IAM",
    "url": "https://www.skills.google/course_templates/1337?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Intermediate",
    "isFastTrack": true,
    "videoUrl": "",
    "scriptFile": "",
    "lang": "",
    "driveUrl": "",
    "note": ""
  },
  {
    "name": "Enhance Gemini Model Capabilities",
    "url": "https://www.skills.google/course_templates/1241?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Intermediate",
    "isFastTrack": true,
    "videoUrl": "",
    "scriptFile": "",
    "lang": "",
    "driveUrl": "",
    "note": ""
  },
  {
    "name": "Analyze and Reason on Multimodal Data with Gemini",
    "url": "https://www.skills.google/course_templates/1240?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Intermediate",
    "isFastTrack": true,
    "videoUrl": "",
    "scriptFile": "",
    "lang": "",
    "driveUrl": "",
    "note": ""
  },
  {
    "name": "Implement Multimodal Vector Search with BigQuery",
    "url": "https://www.skills.google/course_templates/1232?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Intermediate",
    "isFastTrack": true,
    "videoUrl": "",
    "scriptFile": "",
    "lang": "",
    "driveUrl": "",
    "note": ""
  },
  {
    "name": "Protect Cloud Traffic with Chrome Enterprise Premium Security",
    "url": "https://www.skills.google/course_templates/784?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Intermediate",
    "isFastTrack": true,
    "videoUrl": "",
    "scriptFile": "",
    "lang": "",
    "driveUrl": "",
    "note": ""
  },
  {
    "name": "Discover and Protect Sensitive Data Across Your Ecosystem",
    "url": "https://www.skills.google/course_templates/1177?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Intermediate",
    "isFastTrack": true,
    "videoUrl": "",
    "driveUrl": "",
    "scriptFile": "",
    "lang": "",
    "note": ""
  },
  {
    "name": "Secure Software Delivery",
    "url": "https://www.skills.google/course_templates/1164?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Intermediate",
    "isFastTrack": true,
    "videoUrl": "",
    "scriptFile": "",
    "lang": "",
    "driveUrl": "",
    "note": ""
  },
  {
    "name": "Create and Manage AlloyDB Instances",
    "url": "https://www.skills.google/course_templates/642?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Intermediate",
    "isFastTrack": true,
    "videoUrl": "",
    "scriptFile": "",
    "lang": "",
    "driveUrl": "",
    "note": ""
  },
  {
    "name": "Create and Manage Cloud SQL for PostgreSQL Instances",
    "url": "https://www.skills.google/course_templates/652?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Intermediate",
    "isFastTrack": true,
    "videoUrl": "",
    "scriptFile": "",
    "lang": "",
    "driveUrl": "",
    "note": ""
  },
  {
    "name": "Deploy and Manage Apigee X",
    "url": "https://www.skills.google/course_templates/661?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Intermediate",
    "isFastTrack": true,
    "videoUrl": "",
    "scriptFile": "",
    "lang": "",
    "driveUrl": "",
    "note": ""
  },
  {
    "name": "Develop Serverless Apps on Cloud Run",
    "url": "https://www.skills.google/course_templates/741?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Intermediate",
    "isFastTrack": true,
    "videoUrl": "",
    "scriptFile": "",
    "lang": "",
    "driveUrl": "",
    "note": ""
  },
  {
    "name": "Build a Data Warehouse with BigQuery",
    "url": "https://www.skills.google/course_templates/624?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Intermediate",
    "isFastTrack": true,
    "videoUrl": "",
    "scriptFile": "",
    "lang": "",
    "driveUrl": "",
    "note": ""
  },
  {
    "name": "Prepare Data for ML APIs on Google Cloud",
    "url": "https://www.skills.google/course_templates/631?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Intermediate",
    "isFastTrack": true,
    "videoUrl": "",
    "scriptFile": "",
    "lang": "",
    "driveUrl": "",
    "note": ""
  },
  {
    "name": "Build Serverless Applications with Cloud Run Functions",
    "url": "https://www.skills.google/course_templates/696?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Intermediate",
    "isFastTrack": true,
    "videoUrl": "",
    "scriptFile": "",
    "lang": "",
    "driveUrl": "",
    "note": ""
  },
  {
    "name": "Get Started with API Gateway",
    "url": "https://www.skills.google/course_templates/662?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Intermediate",
    "isFastTrack": true,
    "videoUrl": "",
    "scriptFile": "",
    "lang": "",
    "driveUrl": "",
    "note": ""
  },
  {
    "name": "App Building with AppSheet",
    "url": "https://www.skills.google/course_templates/635?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Intermediate",
    "isFastTrack": true,
    "videoUrl": "",
    "scriptFile": "",
    "lang": "",
    "driveUrl": "",
    "note": ""
  },
  {
    "name": "Build Google Cloud Infrastructure for AWS Professionals",
    "url": "https://www.skills.google/course_templates/687?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Intermediate",
    "isFastTrack": true,
    "videoUrl": "",
    "scriptFile": "",
    "lang": "",
    "driveUrl": "",
    "note": ""
  },
  {
    "name": "Create and Manage Bigtable Instances",
    "url": "https://www.skills.google/course_templates/650?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Intermediate",
    "isFastTrack": true,
    "videoUrl": "",
    "scriptFile": "",
    "lang": "",
    "driveUrl": "",
    "note": ""
  },
  {
    "name": "Implement CI/CD Pipelines in Google Cloud",
    "url": "https://www.skills.google/course_templates/691?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Intermediate",
    "isFastTrack": true,
    "videoUrl": "",
    "scriptFile": "",
    "lang": "",
    "driveUrl": "",
    "note": ""
  },
  {
    "name": "Using Functions, Formulas, and Charts in Google Sheets",
    "url": "https://www.skills.google/course_templates/776?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Intermediate",
    "isFastTrack": true,
    "videoUrl": "https://www.youtube.com/embed/DWkLKkzboLs",
    "driveUrl": "https://github.com/Itsabhishek7py/GoogleCloudSkillsboost/tree/main/Files/Use%20Functions%2C%20Formulas%2C%20and%20Charts%20in%20Google%20Sheets%3A%20Challenge%20Lab",
    "scriptFile": "",
    "lang": "",
    "note": ""
  },
  {
    "name": "Create and Manage Cloud Spanner Instances",
    "url": "https://www.skills.google/course_templates/643?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Intermediate",
    "isFastTrack": true,
    "videoUrl": "https://www.youtube.com/embed/_Z1cksiD_lc",
    "driveUrl": "https://docs.google.com/document/d/1Md5Dw8q2_AWdyIuScieO4nx-qNZlIxTOHrzOIMUCg0g/edit?tab=t.0",
    "scriptFile": "",
    "lang": "",
    "note": ""
  },
  {
    "name": "Build Infrastructure with Terraform in Google Cloud",
    "url": "https://www.skills.google/course_templates/636?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Intermediate",
    "isFastTrack": true,
    "videoUrl": "",
    "scriptFile": "",
    "lang": "",
    "driveUrl": "",
    "note": ""
  },
  {
    "name": "Perform Predictive Data Analysis in BigQuery",
    "url": "https://www.skills.google/course_templates/656?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Intermediate",
    "isFastTrack": true,
    "videoUrl": "",
    "scriptFile": "",
    "lang": "",
    "driveUrl": "",
    "note": ""
  },
  {
    "name": "Automate Data Capture at Scale with Document AI",
    "url": "https://www.skills.google/course_templates/674?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Intermediate",
    "isFastTrack": true,
    "videoUrl": "",
    "scriptFile": "",
    "lang": "",
    "driveUrl": "",
    "note": ""
  },
  {
    "name": "Develop and Secure APIs with Apigee X",
    "url": "https://www.skills.google/course_templates/714?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Intermediate",
    "isFastTrack": true,
    "videoUrl": "",
    "scriptFile": "",
    "lang": "",
    "driveUrl": "",
    "note": ""
  },
  {
    "name": "Explore Generative AI in Agent Platform",
    "url": "https://www.skills.google/course_templates/959?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Advanced",
    "isFastTrack": true,
    "videoUrl": "https://www.youtube.com/embed/c9p669U8a0w",
    "scriptFile": "",
    "lang": "",
    "note": "",
    "driveUrl": ""
  },
  {
    "name": "Implementing Cloud Load Balancing for Compute Engine",
    "url": "https://www.skills.google/course_templates/648?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Advanced",
    "isFastTrack": true,
    "videoUrl": "",
    "scriptFile": "",
    "lang": "",
    "driveUrl": "",
    "note": ""
  },
  {
    "name": "Prompt Design in Agent Platform",
    "url": "https://www.skills.google/course_templates/976?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Advanced",
    "isFastTrack": true,
    "videoUrl": "https://www.youtube.com/embed/dJ6B503Xr6s",
    "driveUrl": "https://github.com/abhishekmsm51w-star/gcpbyabhi/blob/main/docudesign/filespdeia.md",
    "scriptFile": "",
    "lang": "",
    "note": ""
  },
  {
    "name": "Inspect Rich Documents with Gemini Multimodality and Multimodal RAG",
    "url": "https://www.skills.google/course_templates/981?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Advanced",
    "isFastTrack": true,
    "videoUrl": "",
    "scriptFile": "",
    "lang": "",
    "driveUrl": "",
    "note": ""
  },
  {
    "name": "Develop Gen AI Apps with Gemini and Streamlit",
    "url": "https://www.skills.google/course_templates/978?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Advanced",
    "isFastTrack": true,
    "videoUrl": "",
    "scriptFile": "",
    "lang": "",
    "driveUrl": "",
    "note": ""
  },
  {
    "name": "Set Up an App Dev Environment on Google Cloud",
    "url": "https://www.skills.google/course_templates/637?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Advanced",
    "isFastTrack": true,
    "videoUrl": "",
    "scriptFile": "",
    "lang": "",
    "driveUrl": "",
    "note": ""
  },
  {
    "name": "Develop Your Google Cloud Network",
    "url": "https://www.skills.google/course_templates/625?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Advanced",
    "isFastTrack": true,
    "videoUrl": "",
    "scriptFile": "",
    "lang": "",
    "driveUrl": "",
    "note": ""
  },
  {
    "name": "Build a Secure Google Cloud Network",
    "url": "https://www.skills.google/course_templates/654?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Advanced",
    "isFastTrack": true,
    "videoUrl": "",
    "scriptFile": "",
    "lang": "",
    "driveUrl": "",
    "note": ""
  },
  {
    "name": "Deploy Kubernetes Applications on Google Cloud",
    "url": "https://www.skills.google/course_templates/663?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Advanced",
    "isFastTrack": true,
    "videoUrl": "",
    "scriptFile": "",
    "lang": "",
    "driveUrl": "",
    "note": ""
  },
  {
    "name": "Derive Insights from BigQuery Data",
    "url": "https://www.skills.google/course_templates/623?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Introductory",
    "isFastTrack": false,
    "videoUrl": "",
    "scriptFile": "",
    "lang": "",
    "note": "Coming Soon / Diupdate Berkala",
    "driveUrl": ""
  },
  {
    "name": "Build LookML Objects in Looker",
    "url": "https://www.skills.google/course_templates/639?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Advanced",
    "isFastTrack": true,
    "videoUrl": "",
    "scriptFile": "",
    "lang": "",
    "driveUrl": "",
    "note": ""
  },
  {
    "name": "Manage Data Models in Looker",
    "url": "https://www.skills.google/course_templates/651?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Advanced",
    "isFastTrack": true,
    "videoUrl": "",
    "scriptFile": "",
    "lang": "",
    "driveUrl": "",
    "note": ""
  },
  {
    "name": "Prepare Data for Looker Dashboards and Reports",
    "url": "https://www.skills.google/course_templates/628?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Advanced",
    "isFastTrack": true,
    "videoUrl": "",
    "scriptFile": "",
    "lang": "",
    "driveUrl": "",
    "note": ""
  },
  {
    "name": "Develop Serverless Apps with Firebase",
    "url": "https://www.skills.google/course_templates/649?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Advanced",
    "isFastTrack": true,
    "videoUrl": "",
    "scriptFile": "",
    "lang": "",
    "driveUrl": "",
    "note": ""
  },
  {
    "name": "Cloud Architecture: Design, Implement, and Manage",
    "url": "https://www.skills.google/course_templates/640?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Advanced",
    "isFastTrack": false,
    "videoUrl": "",
    "scriptFile": "",
    "lang": "",
    "driveUrl": "",
    "note": ""
  },
  {
    "name": "Build Global and Regional Load Balancing Solutions",
    "url": "https://www.skills.google/course_templates/1558?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Advanced",
    "isFastTrack": false,
    "videoUrl": "",
    "scriptFile": "",
    "lang": "",
    "driveUrl": "",
    "note": ""
  },
  {
    "name": "Google DeepMind: Train A Small Language Model",
    "url": "https://www.skills.google/course_templates/1453?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Advanced",
    "isFastTrack": true,
    "videoUrl": "",
    "scriptFile": "",
    "lang": "",
    "driveUrl": "",
    "note": ""
  },
  {
    "name": "Mitigate Threats and Vulnerabilities with Security Command Center",
    "url": "https://www.skills.google/course_templates/759?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Advanced",
    "isFastTrack": true,
    "videoUrl": "",
    "scriptFile": "",
    "lang": "",
    "note": "Maintenance",
    "driveUrl": ""
  },
  {
    "name": "Build a Data Mesh with Knowledge Catalog",
    "url": "https://www.skills.google/course_templates/681?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Advanced",
    "isFastTrack": true,
    "videoUrl": "https://www.youtube.com/embed/Ks7BcvLanWA",
    "driveUrl": "https://physalinotes.vercel.app/#view",
    "scriptFile": "",
    "lang": "",
    "note": ""
  },
  {
    "name": "Deploy Multi-Agent Architectures",
    "url": "https://www.skills.google/course_templates/1445?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Advanced",
    "isFastTrack": true,
    "videoUrl": "",
    "scriptFile": "",
    "lang": "",
    "driveUrl": "",
    "note": ""
  },
  {
    "name": "Optimize Costs for Google Kubernetes Engine",
    "url": "https://www.skills.google/course_templates/655?utm_source=gcaf-site&utm_medium=website&utm_campaign=arcade-facilitator26",
    "level": "Advanced",
    "isFastTrack": true,
    "videoUrl": "",
    "scriptFile": "",
    "lang": "",
    "driveUrl": "",
    "note": ""
  }
]
