
    // Tautan Form Aduan Lab Resmi
    const ADUAN_FORM_URL = "https://forms.gle/a1Bi7qs5QfZAnvVEA";

    // ── DATABASE & STRUCTURE ────────────────────────────────────────────────
    
    // July Arcade Games list containing child/nested labs (Data names sourced from kalkulator.html)
    const julyArcadeGames = [
      {
        id: "game-adventure",
        name: "Arcade Games Adventure (1 Poin)",
        icon: "fa-solid fa-compass text-blue",
        isExpired: true,
        labs: [
          {
            name: "Google AppSheet: Getting Started",
            driveUrl: "https://drive.google.com/drive/folders/1W16uGEwHcygcRTI5Ksp1i2SOgZJ9_7Yn?usp=sharing",
            scriptFile: "",
            lang: ""
          },
          {
            name: "Connect and Configure Data for your AppSheet App",
            driveUrl: "https://drive.google.com/drive/folders/1gWgjXF9Zr5FycsDeDbER03K-WpRm8Zg7?usp=sharing",
            scriptFile: "contacts.xlsx",
            lang: "Excel Spreadsheet"
          },
          {
            name: "Publish your AppSheet App",
            driveUrl: "https://drive.google.com/drive/folders/1uXj8sQSZbKntT-kIMMf0twnHHqjz7sCU?usp=sharing",
            scriptFile: "gsp1030(1).xlsx",
            lang: "Excel Spreadsheet"
          },
          {
            name: "App Building with AppSheet: Challenge Lab",
            driveUrl: "https://drive.google.com/drive/folders/1FevQY1IHMMMfkY1OJL636iaEQvLuRS4O?usp=sharing",
            scriptFile: "companies.xlsx",
            lang: "Excel Spreadsheet"
          },
          {
            name: "Cloud Run Functions: Qwik Start - Console",
            videoUrl: "https://www.youtube.com/embed/2rQ5j9fUyi8",
            scriptFile: "",
            lang: ""
          },
          {
            name: "Cloud Run Functions: Qwik Start - Command Line",
            videoUrl: "https://www.youtube.com/embed/Np7csJrbr0s",
            scriptFile: "",
            lang: ""
          },
          {
            name: "Cloud Run Functions: Qwik Start",
            videoUrl: "https://www.youtube.com/embed/IEkywQ_a-2c",
            scriptFile: "",
            lang: ""
          },
          {
            name: "Build Serverless Applications with Cloud Run Functions: Challenge Lab",
            driveUrl: "https://drive.google.com/file/d/1_K-ki5BIw8iXf6p3DrI7N_3NDi_tvOnr/view?usp=sharing",
            scriptFile: "Build Serverless Applications with Cloud Run Functions Challenge Lab.txt",
            lang: "Shell Script"
          }
        ]
      },
      {
        id: "game-voyage",
        name: "Arcade Games Voyage (1 Poin)",
        icon: "fa-solid fa-ship text-red",
        isExpired: true,
        labs: [
          {
            name: "Enabling Sensitive Data Protection Discovery for Cloud Storage",
            videoUrl: "https://www.youtube.com/embed/e9MgNkNbOUE",
            scriptFile: "script.txt",
            lang: "Shell Script"
          },
          {
            name: "Google Cloud Storage - Bucket Lock",
            videoUrl: "https://www.youtube.com/embed/tvzzzPMMbyY",
            scriptFile: "",
            lang: ""
          },
          {
            name: "Enabling Sensitive Data Protection Discovery for BigQuery",
            videoUrl: "https://www.youtube.com/embed/fIdmx0j3OgE",
            scriptFile: "",
            lang: ""
          },
          {
            name: "Discover and Protect Sensitive Data Across Your Ecosystem: Challenge Lab",
            videoUrl: "https://www.youtube.com/embed/TwCRWl41z7o",
            driveUrl: "https://github.com/abhishekmsm51w-star/gcpbyabhi/blob/main/Discover%20and%20Protect%20Sensitive%20Data%20Across%20Your%20Ecosystem%20Challenge%20Lab/lab.md",
            scriptFile: "",
            lang: ""
          },
          {
            name: "Cloud Storage: Qwik Start - CLI/SDK",
            videoUrl: "https://www.youtube.com/embed/017pF1DefFo",
            scriptFile: "",
            lang: ""
          },
          {
            name: "APIs Explorer: Cloud Storage",
            videoUrl: "https://www.youtube.com/embed/pfkWHLad-E8",
            scriptFile: "APIs Explorer Cloud Storage.txt",
            lang: "JSON Request"
          },
          {
            name: "Introduction to APIs in Google Cloud",
            videoUrl: "https://www.youtube.com/embed/VXGPHm4XPRQ",
            scriptFile: "Introduction to APIs in Google Cloud.txt",
            lang: "Shell Script"
          },
          {
            name: "Use APIs to Work with Cloud Storage: Challenge Lab",
            videoUrl: "https://www.youtube.com/embed/hoQkLb5prS8",
            scriptFile: "Use APIs to Work with Cloud Storage Challenge Lab.txt",
            lang: "Shell Script",
            note: "Sama seperti yang di video, berkas ini disajikan dalam bentuk aslinya agar aman digunakan."
          }
        ]
      },
      {
        id: "game-trail",
        name: "Arcade Games Trail (1 Poin)",
        icon: "fa-solid fa-route text-yellow",
        isExpired: true,
        labs: []
      },
      {
        id: "game-basecamp",
        name: "Arcade Games Base Camp (1 Poin)",
        icon: "fa-solid fa-campground text-blue",
        isExpired: true,
        labs: []
      },
      {
        id: "game-safespaces",
        name: "Arcade Games Safe Spaces (1 Poin)",
        icon: "fa-solid fa-shield-halved text-green",
        isExpired: true,
        labs: []
      },
      {
        id: "game-datamesh",
        name: "Arcade Games Data Mesh Architect (1 Poin)",
        icon: "fa-solid fa-network-wired text-red",
        isExpired: true,
        labs: []
      }
    ];

    // August Arcade Games list
    const augustArcadeGames = [
      {
        id: "game-aug-network",
        name: "Arcade Simulator: Network Security Engineer (1 Poin)",
        icon: "fa-solid fa-shield-halved text-green",
        url: "https://www.skills.google/games/7397?utm_source=googleskills&utm_medium=lp&utm_campaign=specgame-Aug-arcade26",
        code: "1q-network-51470",
        isExpired: false,
        labs: [
          {
            name: "IAM Custom Roles",
            driveUrl: "https://drive.google.com/drive/folders/19jIe4qYwBbhhdjFztror0HtJ8iELs6uv?usp=sharing",
            scriptFile: "iam custom roles.txt",
            lang: "Text Script"
          },
          {
            name: "Configuring IAM Permissions with gcloud",
            videoUrl: "https://www.youtube.com/embed/9yrOuoWjQ70"
          },
          {
            name: "User Authentication: Identity-Aware Proxy",
            videoUrl: "https://www.youtube.com/embed/qrHNwUIFhT8"
          },
          {
            name: "Privileged Access with IAM: Challenge Lab",
            videoUrl: "https://www.youtube.com/embed/S8_Bk6tE3as"
          },
          {
            name: "Claim Skill Badge: Privileged Access with IAM",
            claimUrl: "https://www.skills.google/course_templates/1337?utm_source=googleskills&utm_medium=gametemplate&utm_campaign=simulator-august-arcade26",
            isClaimBadge: true
          },
          {
            name: "Establish Hybrid Network Connectivity with NCC",
            videoUrl: "https://www.youtube.com/embed/wSDlH-IRnjg",
            driveUrl: "https://horizon.orbitofops.com/establish-hybrid-network-connectivity-with-ncc?ref=youtube",
            note: "Resource & Panduan: horizon.orbitofops.com"
          },
          {
            name: "Establish VPC to VPC Connectivity using NCC",
            videoUrl: "https://www.youtube.com/embed/kO-71QhxSMA"
          },
          {
            name: "Establish Site to Site Connectivity with HA-VPN using NCC",
            videoUrl: "https://www.youtube.com/embed/TUMkUppl8q4"
          },
          {
            name: "Connecting Cloud Networks with NCC: Challenge Lab",
            videoUrl: "https://www.youtube.com/embed/dIh7JkuEetk",
            driveUrl: "https://horizon.orbitofops.com/connecting-cloud-networks-with-ncc?ref=youtube",
            note: "Resource & Panduan: horizon.orbitofops.com"
          },
          {
            name: "Claim Skill Badge: Connect Cloud Networks with NCC",
            claimUrl: "https://www.skills.google/course_templates/1364?utm_source=googleskills&utm_medium=gametemplate&utm_campaign=simulator-august-arcade26",
            isClaimBadge: true
          }
        ]
      },
      {
        id: "game-aug-trail",
        name: "Arcade Trail: Cloud Delivery Systems (1 Poin)",
        icon: "fa-solid fa-route text-yellow",
        url: "https://www.skills.google/games/7396?utm_source=googleskills&utm_medium=lp&utm_campaign=trail-Aug-arcade26",
        code: "1q-delivery-31058",
        isExpired: false,
        labs: [
          {
            name: "Develop No-Code Chat Apps with AppSheet",
            videoUrl: "https://www.youtube.com/embed/ChAzLCJHdsA",
            driveUrl: "https://docs.google.com/spreadsheets/d/1X4wbmHgGqgEh2p7PvXFHug-2y2jAQ436/edit?usp=sharing&ouid=105725403435718564993&rtpof=true&sd=true"
          },
          {
            name: "Introduction to Google Chat Bots with Apps Script",
            videoUrl: "https://www.youtube.com/embed/-CNm0DXri8g"
          },
          {
            name: "Google Apps Script: Access Google Sheets, Maps & Gmail in 4 Lines of Code",
            videoUrl: "https://www.youtube.com/embed/1jHmm4et3y8"
          },
          {
            name: "Develop with Apps Script and AppSheet: Challenge Lab",
            videoUrl: "https://www.youtube.com/embed/f2E4bIIbB-0",
            driveUrl: "https://horizon.orbitofops.com/develop-with-apps-script-and-appsheet?ref=youtube"
          },
          {
            name: "Claim Skill Badge: Develop with Apps Script and AppSheet",
            claimUrl: "https://www.skills.google/course_templates/715?utm_source=googleskills&utm_medium=gametemplate&utm_campaign=trail-august-arcade26",
            isClaimBadge: true
          },
          {
            name: "Artifact Registry: Qwik Start",
            videoUrl: "https://www.youtube.com/embed/qAP4Bd9ogSk"
          },
          {
            name: "Google Kubernetes Engine Pipeline using Cloud Build",
            note: "Coming Soon / Diupdate Berkala"
          },
          {
            name: "Continuous Delivery with Google Cloud Deploy",
            videoUrl: "https://www.youtube.com/embed/ak3HQH8ltik"
          },
          {
            name: "Implement CI/CD Pipelines on Google Cloud: Challenge Lab",
            note: "Coming Soon / Diupdate Berkala"
          },
          {
            name: "Claim Skill Badge: Implement CI/CD Pipelines in Google Cloud",
            claimUrl: "https://www.skills.google/course_templates/691?utm_source=googleskills&utm_medium=gametemplate&utm_campaign=trail-august-arcade26",
            isClaimBadge: true
          }
        ]
      },
      {
        id: "game-aug-spans",
        name: "Spans and Plans (1 Poin)",
        icon: "fa-solid fa-diagram-project text-yellow",
        url: "https://www.skills.google/games/7399?utm_source=googleskills&utm_medium=lp&utm_campaign=Special-Aug-arcade26",
        code: "1q-schema-27083",
        isExpired: false,
        labs: [
          {
            name: "Cloud Spanner - Database Fundamentals",
            driveUrl: "https://drive.google.com/file/d/1I4Gz9vJVPBJRmqSQGNYiERk8AQbI0H8e/view?usp=sharing"
          },
          {
            name: "Cloud Spanner - Loading Data and Performing Backups",
            videoUrl: "https://www.youtube.com/embed/zh6hi9pDQSk"
          },
          {
            name: "Spanner - Defining Schemas and Understanding Query Plans",
            videoUrl: "https://www.youtube.com/embed/0aOpx7qLqyY"
          },
          {
            name: "Create and Manage Cloud Spanner Instances: Challenge Lab",
            videoUrl: "https://www.youtube.com/embed/_Z1cksiD_lc",
            driveUrl: "https://docs.google.com/document/d/1Md5Dw8q2_AWdyIuScieO4nx-qNZlIxTOHrzOIMUCg0g/edit?tab=t.0"
          },
          {
            name: "Claim Skill Badge: Create and Manage Cloud Spanner Instances",
            claimUrl: "https://www.skills.google/course_templates/643?utm_source=googleskills&utm_medium=gametemplate&utm_campaign=spl-game-august-arcade26",
            isClaimBadge: true
          },
          {
            name: "Cloud Run Functions: Qwik Start - Console",
            videoUrl: "https://www.youtube.com/embed/wp11IVx1eCM",
            note: "Jika terlalu cepat bisa diatur kecepatan videonya."
          },
          {
            name: "API Gateway: Qwik Start",
            videoUrl: "https://www.youtube.com/embed/ypwF0RdN0qU"
          },
          {
            name: "Pub/Sub: Qwik Start - Console",
            videoUrl: "https://www.youtube.com/embed/qBsTp-UIMxs"
          },
          {
            name: "Deploy and Secure Serverless APIs with API Gateway: Challenge Lab",
            videoUrl: "https://www.youtube.com/embed/buedtvAhZ5o"
          },
          {
            name: "Claim Skill Badge: Deploy and Secure Serverless APIs with API Gateway",
            claimUrl: "https://www.skills.google/course_templates/662?utm_source=googleskills&utm_medium=gametemplate&utm_campaign=spl-game-august-arcade26",
            isClaimBadge: true
          }
        ]
      },
      {
        id: "game-aug-sheets",
        name: "Arcade Voyage: Google Sheets (1 Poin)",
        icon: "fa-solid fa-file-excel text-green",
        url: "https://www.skills.google/games/7398?utm_source=googleskills&utm_medium=lp&utm_campaign=voyage-Aug-arcade26",
        code: "1q-sheets-29185",
        isExpired: false,
        labs: [
          {
            name: "Knowledge Catalog: Qwik Start - Console",
            videoUrl: "https://www.youtube.com/embed/SHD0EbgdEkI",
            note: "Jika terlalu cepat bisa diatur kecepatan videonya."
          },
          {
            name: "Knowledge Catalog: Qwik Start - Command Line",
            videoUrl: "https://www.youtube.com/embed/VwwTC7HBJXw"
          },
          {
            name: "Create and Add Aspects to Knowledge Catalog Assets",
            videoUrl: "https://www.youtube.com/embed/NWlP-7IC8Q4"
          },
          {
            name: "Organize and Govern Data with Knowledge Catalog: Challenge Lab",
            videoUrl: "https://www.youtube.com/embed/3OHoiOYAgIU"
          },
          {
            name: "Claim Skill Badge: Organize and Manage Data with Dataplex",
            claimUrl: "https://www.skills.google/course_templates/726?utm_source=googleskills&utm_medium=gametemplate&utm_campaign=voyage-august-arcade26",
            isClaimBadge: true
          },
          {
            name: "Use Charts in Google Sheets",
            videoUrl: "https://www.youtube.com/embed/obfrIcOmZMI",
            driveUrl: "https://github.com/Itsabhishek7py/GoogleCloudSkillsboost/tree/main/Use%20Charts%20in%20Google%20Sheets"
          },
          {
            name: "Validate Data in Google Sheets",
            videoUrl: "https://www.youtube.com/embed/On81tKBLBBw",
            driveUrl: "https://github.com/Itsabhishek7py/GoogleCloudSkillsboost/blob/main/Validate%20Data%20in%20Google%20Sheets/Drabhishek1062.xlsx"
          },
          {
            name: "Finding Data in Google Sheets",
            videoUrl: "https://www.youtube.com/embed/vxbkyqTjXiI",
            driveUrl: "https://github.com/Itsabhishek7py/GoogleCloudSkillsboost/blob/main/Finding%20Data%20in%20Google%20Sheets/abhishekdr1063.xlsx"
          },
          {
            name: "Use Functions, Formulas, and Charts in Google Sheets: Challenge Lab",
            videoUrl: "https://www.youtube.com/embed/DWkLKkzboLs",
            driveUrl: "https://github.com/Itsabhishek7py/GoogleCloudSkillsboost/tree/main/Files/Use%20Functions%2C%20Formulas%2C%20and%20Charts%20in%20Google%20Sheets%3A%20Challenge%20Lab"
          },
          {
            name: "Claim Skill Badge: Use Functions, Formulas, and Charts in Google Sheets",
            claimUrl: "https://www.skills.google/course_templates/776?utm_source=googleskills&utm_medium=gametemplate&utm_campaign=voyage-august-arcade26",
            isClaimBadge: true
          }
        ]
      },
      {
        id: "game-aug-basecamp",
        name: "Arcade Base Camp August 2026 (1 Poin)",
        icon: "fa-solid fa-campground text-blue",
        url: "https://www.skills.google/games/7394?utm_source=googleskills&utm_medium=lp&utm_campaign=basecamp-Aug-arcade26",
        code: "1q-basecamp-10219",
        isExpired: false,
        labs: [
          {
            name: "Cloud Natural Language API: Qwik Start",
            videoUrl: "https://www.youtube.com/embed/I0Ybwae59ts"
          },
          {
            name: "Using the Natural Language API from Google Docs",
            videoUrl: "https://www.youtube.com/embed/xGOC-_48xiA"
          },
          {
            name: "Entity and Sentiment Analysis with the Natural Language API",
            videoUrl: "https://www.youtube.com/embed/6FMraB49GH4"
          },
          {
            name: "Analyze Sentiment with Natural Language API: Challenge Lab",
            videoUrl: "https://www.youtube.com/embed/8ZKQCncnERg"
          },
          {
            name: "Claim Skill Badge: Analyze Sentiment with Natural Language API",
            claimUrl: "https://www.skills.google/course_templates/667?utm_source=googleskills&utm_medium=gametemplate&utm_campaign=basecamp-august-arcade26ade26",
            isClaimBadge: true
          },
          {
            name: "Cloud Monitoring: Qwik Start",
            videoUrl: "https://www.youtube.com/embed/IY0UTPctU3I"
          },
          {
            name: "Monitoring and Logging for Cloud Run Functions",
            videoUrl: "https://www.youtube.com/embed/LBSE8unqhK4"
          },
          {
            name: "Monitor an Apache Web Server using Ops Agent",
            videoUrl: "https://www.youtube.com/embed/fopVMRO0OLI"
          },
          {
            name: "Monitoring in Google Cloud: Challenge Lab",
            videoUrl: "https://www.youtube.com/embed/omDAvsVfDkQ"
          },
          {
            name: "Claim Skill Badge: Monitoring in Google Cloud",
            claimUrl: "https://www.skills.google/course_templates/747?utm_source=googleskills&utm_medium=gametemplate&utm_campaign=basecamp-august-arcade26",
            isClaimBadge: true
          }
        ]
      },
      {
        id: "game-aug-datavault",
        name: "Arcade Adventure: Data Vault (1 Poin)",
        icon: "fa-solid fa-vault text-blue",
        url: "https://www.skills.google/games/7395?utm_source=googleskills&utm_medium=lp&utm_campaign=adv-Aug-arcade26",
        code: "1q-datamgt-92372",
        isExpired: false,
        labs: [
          {
            name: "Debug Apps on Google Kubernetes Engine",
            videoUrl: "https://www.youtube.com/embed/_aJiYi_bt2Y"
          },
          {
            name: "Collect Metrics from Exporters using the Managed Service for Prometheus",
            videoUrl: "https://www.youtube.com/embed/-A3zxDSwqtw"
          },
          {
            name: "Managing Deployments Using Kubernetes Engine",
            videoUrl: "https://www.youtube.com/embed/ZehWWOZQQD4"
          },
          {
            name: "Manage Kubernetes in Google Cloud: Challenge Lab",
            videoUrl: "https://www.youtube.com/embed/gGiSuO1H4OA",
            driveUrl: "https://arcade.cloudhustlers.in/solution/GSP510-manage-kubernetes-challenge",
            note: "Resource & Panduan: arcade.cloudhustlers.in"
          },
          {
            name: "Claim Skill Badge: Manage Kubernetes in Google Cloud",
            claimUrl: "https://www.skills.google/course_templates/783?utm_source=googleskills&utm_medium=gametemplate&utm_campaign=adv-august-arcade26",
            isClaimBadge: true
          },
          {
            name: "Data Publishing on BigQuery using Authorized Views for Data Sharing Partners",
            videoUrl: "https://www.youtube.com/embed/iXq7GEXGxps"
          },
          {
            name: "Analytics as a Service for Data Sharing Partners",
            videoUrl: "https://www.youtube.com/embed/-06uEHtuAa0"
          },
          {
            name: "Consuming Customer Specific Datasets from Data Sharing Partners using BigQuery",
            videoUrl: "https://www.youtube.com/embed/idpdSAMs-a8"
          },
          {
            name: "Share Data using Google Data Cloud: Challenge Lab",
            videoUrl: "https://www.youtube.com/embed/Vilq-1M_2UM"
          },
          {
            name: "Claim Skill Badge: Share Data using Google Data Cloud",
            claimUrl: "https://www.skills.google/course_templates/657?utm_source=googleskills&utm_medium=gametemplate&utm_campaign=adv-august-arcade26",
            isClaimBadge: true
          }
        ]
      },
      {
        id: "game-aug-retrail",
        name: "Arcade Re-Trail: Vaults & Vectors (1 Poin)",
        icon: "fa-solid fa-repeat text-green",
        url: "https://www.skills.google/games/7426",
        code: "1q-vaults-39213",
        isExpired: false,
        labs: []
      }
    ];

    const skillBadges = [
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
            "note": "Task 3.2: INSERT CORRECT CLASSNAME -> FunctionDeclaration\nTask 3.3: Tool\nTask 3.4: tools=[weather_tool]\nTask 4.2: Update INPUR CORRECT CLASSNAME -> Part.from_uri\nTask 4.2: Update INSERT CORRECT METHOD NAME -> models.generate_content_stream",
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
];

    let currentMainTab = 'arcade';
    let currentSelectedScript = '';

    window.handleScreenshotSelect = function(event) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = function(e) {
        document.getElementById('screenshot-preview').src = e.target.result;
        document.getElementById('screenshot-preview-container').classList.remove('hidden');
        document.getElementById('upload-text').innerText = file.name;
        document.getElementById('upload-icon').className = "fa-solid fa-circle-check text-green";
      }
      reader.readAsDataURL(file);
    };

    window.clearScreenshot = function(event) {
      if (event) event.stopPropagation();
      document.getElementById('complaint-screenshot').value = '';
      document.getElementById('screenshot-preview').src = '';
      document.getElementById('screenshot-preview-container').classList.add('hidden');
      document.getElementById('upload-text').innerText = "Klik untuk pilih gambar screenshot";
      document.getElementById('upload-icon').className = "fa-solid fa-cloud-arrow-up text-muted";
    };

    // ── INITIALIZATION ──────────────────────────────────────────────────────
    document.addEventListener('DOMContentLoaded', () => {
      renderJulyGames();
      renderAugustGames();
      renderSkillBadges();
      updateTrackingDashboard();

      // Set up search filter listener
      document.getElementById('lab-search-input').addEventListener('input', filterLabs);

      // Set up lab complaint form listener
      const complaintForm = document.getElementById('lab-complaint-form');
      const complaintSuccess = document.getElementById('lab-complaint-success');
      const btnSubmit = document.getElementById('btn-submit-complaint');

      if (complaintForm && complaintSuccess) {
        complaintForm.addEventListener('submit', (e) => {
          e.preventDefault();
          const gspCode = document.getElementById('complaint-gsp-code').value.trim();
          const phone = document.getElementById('complaint-phone').value.trim();
          const kendala = document.getElementById('complaint-detail').value.trim();
          
          if (!gspCode || !phone || !kendala) return;

          const fileInput = document.getElementById('complaint-screenshot');
          const file = fileInput ? fileInput.files[0] : null;

          const submitForm = (screenshotUrl) => {
            const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLScVkwoDAyy3M4NBQSXP8JhGeGHcW6f4NMsPuSxSLYoPva_nNA/formResponse';
            const entryGsp = 'entry.1510404680';
            const entryPhone = 'entry.19272436';

            // Format final text: GSP123 - Kendala: Detail kendala [Screenshot: URL]
            const finalGspCode = `${gspCode} - Kendala: ${kendala}${screenshotUrl ? ` [Screenshot: ${screenshotUrl}]` : ''}`;

            const formData = new URLSearchParams();
            formData.append(entryGsp, finalGspCode);
            formData.append(entryPhone, phone);

            fetch(formUrl, {
              method: 'POST',
              mode: 'no-cors',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              body: formData.toString()
            })
            .then(() => {
              complaintForm.reset();
              if (window.clearScreenshot) window.clearScreenshot();
              complaintSuccess.classList.remove('hidden');
              setTimeout(() => {
                complaintSuccess.classList.add('hidden');
              }, 5000);
            })
            .catch(err => {
              console.warn('Complaint send error:', err);
              complaintForm.reset();
              if (window.clearScreenshot) window.clearScreenshot();
              complaintSuccess.classList.remove('hidden');
              setTimeout(() => {
                complaintSuccess.classList.add('hidden');
              }, 5000);
            })
            .finally(() => {
              if (btnSubmit) {
                btnSubmit.disabled = false;
                btnSubmit.innerHTML = '<i class="fa-solid fa-paper-plane"></i> Kirim Laporan Kendala';
              }
            });
          };

          if (btnSubmit) {
            btnSubmit.disabled = true;
          }

          if (file) {
            if (btnSubmit) {
              btnSubmit.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Mengunggah Gambar...';
            }

            // Compress image via canvas before uploading
            const compressAndUpload = () => {
              const img = new Image();
              const objectUrl = URL.createObjectURL(file);
              img.onload = function() {
                URL.revokeObjectURL(objectUrl);
                const canvas = document.createElement('canvas');
                let w = img.width, h = img.height;
                const MAX = 1200;
                if (w > MAX) { h = Math.round(h * MAX / w); w = MAX; }
                canvas.width = w; canvas.height = h;
                canvas.getContext('2d').drawImage(img, 0, 0, w, h);
                const base64 = canvas.toDataURL('image/jpeg', 0.75);

                // Upload via server proxy (API key aman di server)
                fetch('/api/upload', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ image: base64 })
                })
                .then(res => res.json())
                .then(data => {
                  if (data.success && data.url) {
                    if (btnSubmit) btnSubmit.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Mengirim Laporan...';
                    submitForm(data.url);
                  } else {
                    console.warn('Upload warning:', data.error);
                    if (btnSubmit) btnSubmit.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Mengirim Laporan (Tanpa Gambar)...';
                    submitForm(null);
                  }
                })
                .catch(err => {
                  console.warn('Upload error:', err);
                  if (btnSubmit) btnSubmit.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Mengirim Laporan (Tanpa Gambar)...';
                  submitForm(null);
                });
              };
              img.src = objectUrl;
            };

            compressAndUpload();
          } else {
            if (btnSubmit) {
              btnSubmit.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Mengirim Laporan...';
            }
            submitForm(null);
          }
        });
      }
    });

    // ── RENDER FUNCTIONS ────────────────────────────────────────────────────
    
    // Helper untuk mendeteksi tipe sumber belajar (GitHub, Google Drive, Docs, Panduan Web, dll.)
    function getResourceInfo(url) {
      if (!url) return null;
      const lower = url.toLowerCase();
      if (lower.includes('github.com')) {
        return {
          type: 'github',
          label: 'Buka di GitHub',
          badgeText: 'GitHub',
          icon: 'fa-brands fa-github',
          badgeStyle: 'background: rgba(255,255,255,0.1); color: #f8fafc; font-size: 0.68rem; border: 1px solid rgba(255,255,255,0.2);',
          btnStyle: 'background: #24292e; color: #ffffff; border: 1px solid rgba(255,255,255,0.2);'
        };
      }
      if (lower.includes('drive.google.com')) {
        return {
          type: 'drive',
          label: 'Buka di Google Drive',
          badgeText: 'Google Drive',
          icon: 'fa-brands fa-google-drive',
          badgeStyle: 'background: rgba(15, 157, 88, 0.18); color: #34d399; font-size: 0.68rem; border: 1px solid rgba(15, 157, 88, 0.35);',
          btnStyle: 'background: #0f9d58; color: #ffffff; border: none;'
        };
      }
      if (lower.includes('docs.google.com')) {
        const isSheet = lower.includes('spreadsheets');
        return {
          type: 'docs',
          label: isSheet ? 'Buka Spreadsheet' : 'Buka Google Docs',
          badgeText: isSheet ? 'Spreadsheet' : 'Google Docs',
          icon: isSheet ? 'fa-solid fa-file-excel' : 'fa-solid fa-file-lines',
          badgeStyle: 'background: rgba(59, 130, 246, 0.18); color: #60a5fa; font-size: 0.68rem; border: 1px solid rgba(59, 130, 246, 0.35);',
          btnStyle: 'background: #1a73e8; color: #ffffff; border: none;'
        };
      }
      // External Web article / guide link (contoh: horizon.orbitofops.com)
      return {
        type: 'web',
        label: 'Buka Panduan Web',
        badgeText: 'Panduan Web',
        icon: 'fa-solid fa-globe',
        badgeStyle: 'background: rgba(20, 184, 166, 0.18); color: #2dd4bf; font-size: 0.68rem; border: 1px solid rgba(20, 184, 166, 0.35);',
        btnStyle: 'background: linear-gradient(135deg, #0d9488, #0284c7); color: #ffffff; border: none;'
      };
    }

    function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .replace(/[\r\n]+/g, ' ');
}

window.openSkillBadgeModal = (index) => {
  const badge = skillBadges[index];
  if (!badge) return;
  const subLabsData = badge.subLabs ? encodeURIComponent(JSON.stringify(badge.subLabs)) : '';
  openSolutionModal(
    badge.name || '',
    badge.videoUrl || '',
    badge.driveUrl || '',
    badge.scriptFile || '',
    badge.lang || '',
    badge.note || '',
    subLabsData
  );
};

function renderJulyGames() {
      const container = document.getElementById('july-games-container');
      container.innerHTML = '';

      julyArcadeGames.forEach(game => {
        const gameCard = document.createElement('div');
        gameCard.className = 'game-collapse-card' + (game.isExpired ? ' expired-game' : '');
        gameCard.id = game.id;

        // Render Labs list items
        let labsHTML = '';
        if (game.labs.length === 0) {
          labsHTML = '<p style="font-size: 0.82rem; color: var(--text-muted); font-style: italic; padding: 10px 0;"><i class="fa-solid fa-clock" style="margin-right: 6px;"></i>Coming Soon / Diupdate Berkala</p>';
        } else {
          game.labs.forEach(lab => {
            const videoUrl = lab.videoUrl || '';
            const driveUrl = lab.driveUrl || '';

            let badgesHTML = '';
            if (videoUrl) {
              badgesHTML += `<span class="badge" style="background: rgba(239, 68, 68, 0.15); color: #f87171; font-size: 0.68rem; padding: 2px 7px; border: 1px solid rgba(239, 68, 68, 0.3);"><i class="fa-brands fa-youtube"></i> Video</span>`;
            }
            if (lab.scriptFile) {
              badgesHTML += `<span class="badge" style="background: rgba(168, 85, 247, 0.15); color: #c084fc; font-size: 0.68rem; padding: 2px 7px; border: 1px solid rgba(168, 85, 247, 0.3);"><i class="fa-solid fa-code"></i> Script</span>`;
            }
            if (driveUrl) {
              const resInfo = getResourceInfo(driveUrl);
              if (resInfo) {
                badgesHTML += `<span class="badge" style="${resInfo.badgeStyle} padding: 2px 7px;"><i class="${resInfo.icon}"></i> ${resInfo.badgeText}</span>`;
              }
            }

            labsHTML += `
              <div class="lab-item" data-search-name="${lab.name.toLowerCase()}">
                <div class="lab-name-container" style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                  <i class="fa-solid fa-flask lab-icon"></i>
                  <span class="lab-name">${lab.name}</span>
                  <div style="display: inline-flex; align-items: center; gap: 4px; flex-wrap: wrap;">
                    ${badgesHTML}
                  </div>
                </div>
                <button class="btn btn-primary" style="padding: 6px 14px; font-size: 0.75rem; display: inline-flex; align-items: center; gap: 6px; background: linear-gradient(135deg, var(--g-blue), #2563eb); border: none;" 
                   onclick="openSolutionModal('${escapeHtml(lab.name)}', '${videoUrl}', '${driveUrl}', '${lab.scriptFile || ''}', '${lab.lang || ''}', '${escapeHtml(lab.note || '')}')">
                  <i class="fa-solid fa-circle-play"></i> Lihat Tutorial
                </button>
              </div>
            `;
          });
        }

        const expiredBadge = game.isExpired ? `<span class="badge red-badge" style="font-size: 0.65rem; margin-left: 10px; display: inline-flex; align-items: center; gap: 4px; vertical-align: middle;"><i class="fa-solid fa-hourglass-end"></i> Batas Waktu Habis</span>` : '';
        const chevronHTML = game.isExpired ? '' : '<i class="fa-solid fa-chevron-down game-chevron"></i>';

        gameCard.innerHTML = `
          <div class="game-header" onclick="toggleGameCollapse('${game.id}')">
            <div class="game-title">
              <i class="${game.icon}"></i>
              <span>${game.name}</span> ${expiredBadge}
            </div>
            ${chevronHTML}
          </div>
          <div class="game-content">
            <div class="labs-list">
              ${labsHTML}
            </div>
          </div>
        `;
        container.appendChild(gameCard);
      });
    }

    function renderAugustGames() {
      const container = document.getElementById('august-games-container');
      if (!container) return;

      const bannerHTML = `
        <div class="glass" style="padding: 16px 20px; margin-bottom: 20px; border-left: 4px solid var(--g-yellow); display: flex; align-items: flex-start; gap: 14px; background: rgba(245, 158, 11, 0.08);">
          <i class="fa-solid fa-lightbulb text-yellow" style="font-size: 1.3rem; margin-top: 2px; flex-shrink: 0;"></i>
          <div style="font-size: 0.85rem; color: var(--text-light); line-height: 1.6;">
            <strong style="color: var(--g-yellow); display: block; margin-bottom: 4px;">📌 Petunjuk Opsional Klaim Skill Badge:</strong>
            Link <strong>Claim Skill Badge</strong> bersifat opsional. Jika kamu sudah menyelesaikan challenge lab terkait, kamu bisa sekalian klaim skill badgenya dengan cara mengunjungi link lab tersebut, klik tombol <strong>Start Lab</strong> pada bagian challenge lab skill badgenya, lalu langsung <strong>End Lab</strong>. Nanti skill badgenya otomatis masuk ke profil kamu!
          </div>
        </div>
      `;

      container.innerHTML = bannerHTML;

      augustArcadeGames.forEach(game => {
        const gameCard = document.createElement('div');
        gameCard.className = 'game-collapse-card' + (game.isExpired ? ' expired-game' : '');
        gameCard.id = game.id;

        // Render Labs list items
        let labsHTML = '';
        if (!game.labs || game.labs.length === 0) {
          labsHTML = '<p style="font-size: 0.82rem; color: var(--text-muted); font-style: italic; padding: 10px 0;"><i class="fa-solid fa-clock" style="margin-right: 6px;"></i>Tutorial & Solusi Lab Sedang Disiapkan oleh Fasilitator</p>';
        } else {
          game.labs.forEach(lab => {
            const videoUrl = lab.videoUrl || '';
            const driveUrl = lab.driveUrl || '';

            if (lab.isClaimBadge) {
              labsHTML += `
                <div class="lab-item" data-search-name="${lab.name.toLowerCase()}" style="background: rgba(245, 158, 11, 0.08); border: 1px dashed rgba(245, 158, 11, 0.4); padding: 12px 16px; border-radius: var(--border-radius-sm); margin: 8px 0; display: flex; flex-direction: column; gap: 8px; align-items: flex-start;">
                  <div style="display: flex; justify-content: space-between; align-items: center; width: 100%; flex-wrap: wrap; gap: 10px;">
                    <div class="lab-name-container">
                      <i class="fa-solid fa-award text-yellow lab-icon" style="font-size: 1.1rem;"></i>
                      <span class="lab-name" style="font-weight: 600; color: #fef08a;">${lab.name}</span>
                    </div>
                    <a href="${lab.claimUrl}" target="_blank" class="btn" style="padding: 6px 14px; font-size: 0.75rem; display: inline-flex; align-items: center; gap: 6px; background: linear-gradient(135deg, #f59e0b, #d97706); border: none; color: #fff; text-decoration: none; border-radius: 6px; font-weight: 600; box-shadow: 0 0 10px rgba(245, 158, 11, 0.2);">
                      <i class="fa-solid fa-award"></i> Claim Skill Badge
                    </a>
                  </div>
                  <p style="font-size: 0.76rem; color: var(--text-muted); margin: 0; line-height: 1.4; font-style: italic;">
                    <i class="fa-solid fa-circle-info" style="margin-right: 4px; color: var(--g-yellow);"></i> <strong>Opsional:</strong> Jika kamu sudah menyelesaikan challenge lab di atas, kamu bisa klaim badge ini dengan cara buka link, klik <strong>Start Lab</strong>, lalu langsung <strong>End Lab</strong>.
                  </p>
                </div>
              `;
            } else {
              const hasTutorial = videoUrl || driveUrl || lab.scriptFile;

              let badgesHTML = '';
              if (videoUrl) {
                badgesHTML += `<span class="badge" style="background: rgba(239, 68, 68, 0.15); color: #f87171; font-size: 0.68rem; padding: 2px 7px; border: 1px solid rgba(239, 68, 68, 0.3);"><i class="fa-brands fa-youtube"></i> Video</span>`;
              }
              if (lab.scriptFile) {
                badgesHTML += `<span class="badge" style="background: rgba(168, 85, 247, 0.15); color: #c084fc; font-size: 0.68rem; padding: 2px 7px; border: 1px solid rgba(168, 85, 247, 0.3);"><i class="fa-solid fa-code"></i> Script</span>`;
              }
              if (driveUrl) {
                const resInfo = getResourceInfo(driveUrl);
                if (resInfo) {
                  badgesHTML += `<span class="badge" style="${resInfo.badgeStyle} padding: 2px 7px;"><i class="${resInfo.icon}"></i> ${resInfo.badgeText}</span>`;
                }
              }

              const buttonHTML = hasTutorial ? `
                <button class="btn btn-primary" style="padding: 6px 14px; font-size: 0.75rem; display: inline-flex; align-items: center; gap: 6px; background: linear-gradient(135deg, var(--g-blue), #2563eb); border: none;" 
                   onclick="openSolutionModal('${escapeHtml(lab.name)}', '${videoUrl}', '${driveUrl}', '${lab.scriptFile || ''}', '${lab.lang || ''}', '${escapeHtml(lab.note || '')}')">
                  <i class="fa-solid fa-circle-play"></i> Lihat Tutorial
                </button>
              ` : `
                <span class="badge yellow-badge" style="font-size: 0.7rem; padding: 4px 10px;"><i class="fa-solid fa-clock"></i> Coming Soon</span>
              `;

              labsHTML += `
                <div class="lab-item" data-search-name="${lab.name.toLowerCase()}">
                  <div class="lab-name-container" style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                    <i class="fa-solid fa-flask lab-icon"></i>
                    <span class="lab-name">${lab.name}</span>
                    <div style="display: inline-flex; align-items: center; gap: 4px; flex-wrap: wrap;">
                      ${badgesHTML}
                    </div>
                  </div>
                  ${buttonHTML}
                </div>
              `;
            }
          });
        }

        const expiredBadge = game.isExpired ? `<span class="badge red-badge" style="font-size: 0.65rem; margin-left: 10px; display: inline-flex; align-items: center; gap: 4px; vertical-align: middle;"><i class="fa-solid fa-hourglass-end"></i> Batas Waktu Habis</span>` : '';
        const chevronHTML = game.isExpired ? '' : '<i class="fa-solid fa-chevron-down game-chevron"></i>';

        const codeBadge = game.code ? `
          <div style="margin-top: 10px; font-size: 0.8rem; background: rgba(0,0,0,0.3); padding: 8px 12px; border-radius: var(--border-radius-sm); border: 1px solid var(--glass-border); color: var(--text-light); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px;">
            <span>Access Code: <code style="font-weight: 700; color: var(--g-yellow); font-family: monospace;">${game.code}</code></span>
            <a href="${game.url}" target="_blank" onclick="event.stopPropagation()" class="btn btn-outline" style="padding: 4px 12px; font-size: 0.75rem;">
              <i class="fa-solid fa-play"></i> Mulai Game
            </a>
          </div>
        ` : '';

        gameCard.innerHTML = `
          <div class="game-header" onclick="toggleGameCollapse('${game.id}')">
            <div class="game-title">
              <i class="${game.icon}"></i>
              <span>${game.name}</span> ${expiredBadge}
            </div>
            ${chevronHTML}
          </div>
          <div class="game-content">
            ${codeBadge}
            <div class="labs-list" style="margin-top: 10px;">
              ${labsHTML}
            </div>
          </div>
        `;
        container.appendChild(gameCard);
      });
    }

    function renderSkillBadges() {
      const container = document.getElementById('skills-badges-list');
      container.innerHTML = '';

      // Get completed skill badges
      const completedSkills = JSON.parse(localStorage.getItem('completed_skill_badges') || '[]');

      skillBadges.forEach((badge, index) => {
        const card = document.createElement('div');
        card.className = 'glass skill-badge-card-item';
        card.style.padding = '20px';
        card.style.display = 'flex';
        card.style.flexDirection = 'column';
        card.style.justifyContent = 'space-between';
        card.style.gap = '15px';
        card.style.position = 'relative'; // Crucial for absolute checkmark positioning
        card.setAttribute('data-search-name', badge.name.toLowerCase());

        const isCompleted = completedSkills.includes(badge.name);
        if (isCompleted) {
          card.style.border = '1px solid rgba(16, 185, 129, 0.4)';
          card.style.boxShadow = '0 0 15px rgba(16, 185, 129, 0.1)';
        }

        let lvlBadge = 'blue-badge';
        if (badge.level === 'Intermediate') lvlBadge = 'yellow-badge';
        else if (badge.level === 'Advanced') lvlBadge = 'red-badge';

        const fastTrackTag = badge.isFastTrack 
          ? `<span class="badge" style="font-size: 0.6rem; padding: 2px 6px; background: linear-gradient(135deg, #10b981, #059669); color: white;"><i class="fa-solid fa-bolt"></i> Fast Track</span>` 
          : '';

        const videoUrl = badge.videoUrl || '';
        const driveUrl = badge.driveUrl || '';

        const hasTutorial = videoUrl || driveUrl || badge.scriptFile || badge.note || (badge.subLabs && badge.subLabs.length > 0);
        const subLabsData = badge.subLabs ? encodeURIComponent(JSON.stringify(badge.subLabs)) : '';
        const checkmarkHTML = `
          <div class="badge-check-wrapper" onclick="toggleSkillBadge('${escapeHtml(badge.name)}', event)" style="position: absolute; top: 15px; right: 15px; cursor: pointer; z-index: 10; display: flex; align-items: center; justify-content: center; width: 24px; height: 24px; border-radius: 6px; border: 1px solid ${isCompleted ? '#10b981' : 'var(--glass-border)'}; background: ${isCompleted ? '#10b981' : 'rgba(0,0,0,0.3)'}; color: ${isCompleted ? 'white' : 'transparent'}; transition: all 0.2s ease;" title="${isCompleted ? 'Tandai belum selesai' : 'Tandai selesai'}">
            <i class="fa-solid fa-check" style="font-size: 0.75rem;"></i>
          </div>
        `;

        card.innerHTML = `
          ${checkmarkHTML}
          <div>
            <a href="${badge.url}" target="_blank" style="font-weight: 700; font-size: 0.95rem; color: var(--text-light); margin-bottom: 10px; min-height: 44px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; padding-right: 25px; text-decoration: none; transition: color 0.2s;" onmouseover="this.style.color='var(--g-blue)'" onmouseout="this.style.color='var(--text-light)'">
              ${badge.name} <i class="fa-solid fa-arrow-up-right-from-square" style="font-size: 0.7rem; margin-left: 4px; opacity: 0.7;"></i>
            </a>
            <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 5px;">
              <span class="badge ${lvlBadge}" style="font-size: 0.65rem; padding: 3px 8px;">${badge.level}</span>
              ${fastTrackTag}
            </div>
          </div>
          <div style="display: flex; gap: 10px; margin-top: 10px; width: 100%;">
            <a href="${badge.url}" target="_blank" class="btn btn-outline" style="padding: 10px 14px; font-size: 0.8rem; display: inline-flex; align-items: center; justify-content: center; gap: 6px; flex: 1; border: 1px solid var(--glass-border); background: rgba(255,255,255,0.02); text-decoration: none; border-radius: var(--border-radius-md); color: var(--text-light);">
              <i class="fa-solid fa-arrow-up-right-from-square"></i> Mulai Lab
            </a>
            ${hasTutorial ? `
              <button class="btn btn-primary" style="padding: 10px 14px; font-size: 0.8rem; display: inline-flex; align-items: center; justify-content: center; gap: 6px; flex: 1; background: linear-gradient(135deg, var(--g-blue), #2563eb); border: none; border-radius: var(--border-radius-md);"
                onclick="openSkillBadgeModal(${index})">
                <i class="fa-solid fa-circle-play"></i> Solusi
              </button>
            ` : `
              <button class="btn btn-secondary" style="padding: 10px 14px; font-size: 0.8rem; display: inline-flex; align-items: center; justify-content: center; gap: 6px; flex: 1; background: rgba(255,255,255,0.04); border: 1px solid var(--glass-border); border-radius: var(--border-radius-md); color: var(--text-muted); cursor: not-allowed;" disabled>
                <i class="fa-solid fa-clock"></i> Coming Soon
              </button>
            `}
          </div>
        `;
        container.appendChild(card);
      });
    }

    // ── TAB SWITCHING ───────────────────────────────────────────────────────
    
    window.switchMainTab = (tabId) => {
      currentMainTab = tabId;
      
      // Toggle button states
      document.getElementById('tab-btn-arcade').classList.toggle('active', tabId === 'arcade');
      document.getElementById('tab-btn-skills').classList.toggle('active', tabId === 'skills');
      document.getElementById('tab-btn-complaints').classList.toggle('active', tabId === 'complaints');

      // Toggle tab layouts
      document.getElementById('tab-content-arcade').classList.toggle('hidden', tabId !== 'arcade');
      document.getElementById('tab-content-skills').classList.toggle('hidden', tabId !== 'skills');
      document.getElementById('tab-content-complaints').classList.toggle('hidden', tabId !== 'complaints');

      // Reset search input
      document.getElementById('lab-search-input').value = '';
      
      // Hide search bar container if on complaints tab
      const searchWrapper = document.getElementById('lab-search-input').parentElement;
      if (searchWrapper) {
        searchWrapper.style.display = tabId === 'complaints' ? 'none' : 'block';
      }
      
      filterLabs();
    };

    window.switchMonthTab = (monthId) => {
      // Deactivate all month buttons
      const btnJuly = document.getElementById('btn-month-july');
      const btnAugust = document.getElementById('btn-month-august');
      if (btnJuly) btnJuly.classList.remove('active');
      if (btnAugust) btnAugust.classList.remove('active');

      // Hide all month containers
      const containerJuly = document.getElementById('july-games-container');
      const containerAugust = document.getElementById('august-games-container');
      if (containerJuly) containerJuly.classList.add('hidden');
      if (containerAugust) containerAugust.classList.add('hidden');

      // Activate selected month
      if (monthId === 'july') {
        if (btnJuly) btnJuly.classList.add('active');
        if (containerJuly) containerJuly.classList.remove('hidden');
      } else if (monthId === 'august') {
        if (btnAugust) btnAugust.classList.add('active');
        if (containerAugust) containerAugust.classList.remove('hidden');
      }
    };

    // ── TRACKING HELPERS ────────────────────────────────────────────────────
    
    function updateTrackingDashboard() {
      const completedSkills = JSON.parse(localStorage.getItem('completed_skill_badges') || '[]');
      const total = skillBadges.length;
      const completedCount = skillBadges.filter(b => completedSkills.includes(b.name)).length;
      const pct = total > 0 ? Math.round((completedCount / total) * 100) : 0;
      
      const countEl = document.getElementById('tracking-count');
      const totalEl = document.getElementById('tracking-total');
      const percentEl = document.getElementById('tracking-percent');
      const barEl = document.getElementById('tracking-progress-bar');
      
      if (countEl) countEl.textContent = completedCount;
      if (totalEl) totalEl.textContent = total;
      if (percentEl) percentEl.textContent = `${pct}%`;
      if (barEl) barEl.style.width = `${pct}%`;
    }

    window.toggleSkillBadge = (badgeName, event) => {
      if (event) event.stopPropagation();
      let completedSkills = JSON.parse(localStorage.getItem('completed_skill_badges') || '[]');
      const index = completedSkills.indexOf(badgeName);
      if (index === -1) {
        completedSkills.push(badgeName);
      } else {
        completedSkills.splice(index, 1);
      }
      localStorage.setItem('completed_skill_badges', JSON.stringify(completedSkills));
      
      renderSkillBadges();
      updateTrackingDashboard();
    };

    window.exportProgress = () => {
      const completedSkills = localStorage.getItem('completed_skill_badges') || '[]';
      const blob = new Blob([completedSkills], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'arcade-skill-badges-progress.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 1000);
    };

    window.exportProgressExcel = () => {
      const completedSkills = JSON.parse(localStorage.getItem('completed_skill_badges') || '[]');
      
      let html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">`;
      html += `<head><meta charset="utf-8">`;
      html += `<style>`;
      html += `
        table { border-collapse: collapse; font-family: 'Segoe UI', Helvetica, Arial, sans-serif; }
        .title-row { font-size: 16pt; font-weight: bold; color: #ffffff; background-color: #1a73e8; text-align: center; height: 50px; }
        .meta-label { font-weight: bold; background-color: #f8f9fa; color: #3c4043; border: 1px solid #dadce0; padding: 10px; font-size: 10pt; }
        .meta-val { color: #3c4043; border: 1px solid #dadce0; padding: 10px; font-size: 10pt; }
        th { background-color: #34a853; color: white; font-weight: bold; border: 1px solid #247e3a; padding: 12px 10px; text-align: left; font-size: 11pt; }
        td { border: 1px solid #dadce0; padding: 10px; font-size: 10pt; }
        .row-even { background-color: #ffffff; }
        .row-odd { background-color: #f8f9fa; }
        .status-done { background-color: #e6f4ea; color: #137333; font-weight: bold; text-align: center; }
        .status-pending { background-color: #fce8e6; color: #c5221f; font-weight: bold; text-align: center; }
        .level-beginner { background-color: #e8f0fe; color: #1a73e8; text-align: center; }
        .level-intermediate { background-color: #fef7e0; color: #b06000; text-align: center; }
        .level-advanced { background-color: #fce8e6; color: #c5221f; text-align: center; }
        .badge-ft { background-color: #e8f0fe; color: #1a73e8; font-weight: bold; text-align: center; }
        .badge-reg { text-align: center; color: #5f6368; }
      `;
      html += `</style></head><body>`;
      
      // Title Block
      html += `<table>`;
      html += `<tr><td colspan="5" class="title-row" style="vertical-align: middle;">LAPORAN PROGRES ARCADE SKILL BADGES 2026</td></tr>`;
      html += `<tr><td colspan="5" style="height: 15px;"></td></tr>`;
      
      // Metadata Block
      const dateStr = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });
      const total = skillBadges.length;
      const completedCount = skillBadges.filter(b => completedSkills.includes(b.name)).length;
      const pct = total > 0 ? Math.round((completedCount / total) * 100) : 0;

      html += `<tr>`;
      html += `<td colspan="2" class="meta-label">Tanggal Ekspor:</td>`;
      html += `<td colspan="3" class="meta-val">${dateStr}</td>`;
      html += `</tr>`;
      html += `<tr>`;
      html += `<td colspan="2" class="meta-label">Progres Pengerjaan:</td>`;
      html += `<td colspan="3" class="meta-val" style="font-weight: bold; color: #137333; background-color: #e6f4ea;">${completedCount} / ${total} Selesai (${pct}%)</td>`;
      html += `</tr>`;
      html += `<tr><td colspan="5" style="height: 15px;"></td></tr>`;
      
      // Table Headers
      html += `<tr>`;
      html += `<th style="width: 50px;">No</th>`;
      html += `<th style="width: 400px;">Nama Skill Badge</th>`;
      html += `<th style="width: 130px;">Level</th>`;
      html += `<th style="width: 130px;">Tipe</th>`;
      html += `<th style="width: 160px;">Status</th>`;
      html += `</tr>`;
      
      // Table Rows
      skillBadges.forEach((badge, idx) => {
        const isDone = completedSkills.includes(badge.name);
        const rowClass = idx % 2 === 0 ? 'row-even' : 'row-odd';
        const statusText = isDone ? 'SELESAI' : 'BELUM SELESAI';
        const statusClass = isDone ? 'status-done' : 'status-pending';
        const typeText = badge.isFastTrack ? 'Fast Track' : 'Regular';
        const typeClass = badge.isFastTrack ? 'badge-ft' : 'badge-reg';
        
        let lvlClass = 'level-beginner';
        if (badge.level === 'Intermediate') lvlClass = 'level-intermediate';
        else if (badge.level === 'Advanced') lvlClass = 'level-advanced';

        html += `<tr class="${rowClass}">`;
        html += `<td style="text-align: center; vertical-align: middle;">${idx + 1}</td>`;
        html += `<td style="vertical-align: middle;">${badge.name}</td>`;
        html += `<td class="${lvlClass}" style="vertical-align: middle;">${badge.level}</td>`;
        html += `<td class="${typeClass}" style="vertical-align: middle;">${typeText}</td>`;
        html += `<td class="${statusClass}" style="vertical-align: middle;">${statusText}</td>`;
        html += `</tr>`;
      });
      
      html += `</table></body></html>`;
      
      const blob = new Blob([html], { type: 'application/vnd.ms-excel;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `arcade_skill_badges_progress_${new Date().toISOString().slice(0,10)}.xls`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 1000);
    };

    window.triggerImport = () => {
      document.getElementById('import-file-input').click();
    };

    // Normalize badge name for fuzzy matching
    function normalizeName(str) {
      return str.toLowerCase().replace(/[\s\-_:]+/g, ' ').trim();
    }

    // Smart parser: scan all rows to find header row, then extract names+status
    function parseRowsForBadges(rows) {
      let headerRowIdx = -1;
      let nameColIdx = -1;
      let statusColIdx = -1;

      // Primary header search: find row containing exact header cell like "Nama Skill Badge"
      for (let i = 0; i < Math.min(rows.length, 25); i++) {
        const row = rows[i].map(c => String(c || '').toLowerCase().trim());
        const rowText = row.join(' ');
        
        // Skip title or metadata rows
        if (rowText.includes('laporan progres') || rowText.includes('tanggal ekspor') || rowText.includes('progres pengerjaan')) {
          continue;
        }

        const nIdx = row.findIndex(c =>
          c === 'nama skill badge' || c === 'nama badge' || c === 'nama skill' ||
          c === 'badge name' || c === 'nama' || c === 'skill badge' || c === 'name'
        );
        const sIdx = row.findIndex(c => c === 'status' || c.includes('status'));

        if (nIdx !== -1) {
          headerRowIdx = i;
          nameColIdx = nIdx;
          statusColIdx = sIdx;
          break;
        }
      }

      // Secondary header search: find any non-title row with both a badge-like column and a status/level column
      if (headerRowIdx === -1) {
        for (let i = 0; i < Math.min(rows.length, 25); i++) {
          const row = rows[i].map(c => String(c || '').toLowerCase().trim());
          const rowText = row.join(' ');
          if (rowText.includes('laporan progres') || rowText.includes('tanggal ekspor') || rowText.includes('progres pengerjaan')) {
            continue;
          }

          const nIdx = row.findIndex(c => c.includes('badge') || c.includes('skill') || c.includes('nama'));
          const sIdx = row.findIndex(c => c.includes('status') || c.includes('level') || c.includes('tipe') || c.includes('type'));

          if (nIdx !== -1 && sIdx !== -1 && nIdx !== sIdx) {
            headerRowIdx = i;
            nameColIdx = nIdx;
            statusColIdx = row.findIndex(c => c.includes('status'));
            break;
          }
        }
      }

      if (headerRowIdx === -1) {
        // Fallback if no header row found (e.g. raw list of badge names, 1 per line)
        return rows
          .map(r => String(r[0] || '').trim())
          .filter(name => {
            if (!name) return false;
            const low = name.toLowerCase();
            return !low.includes('laporan') && !low.includes('tanggal') && !low.includes('progres') && !low.includes('no');
          });
      }

      const names = [];
      rows.slice(headerRowIdx + 1).forEach(row => {
        if (!row || row.length === 0) return;
        const nameCell = nameColIdx !== -1 && nameColIdx < row.length ? row[nameColIdx] : row[0];
        const name = String(nameCell || '').trim();
        if (!name) return;

        const lowName = name.toLowerCase();
        if (lowName.includes('laporan') || lowName.includes('tanggal') || lowName.includes('progres')) return;

        if (statusColIdx !== -1 && statusColIdx < row.length) {
          const status = String(row[statusColIdx] || '').toLowerCase().trim();
          const isNotDone = status.includes('belum') || status.includes('not') || status === 'tidak' || status === 'no' || status === '0' || status === 'false';
          const isDone = !isNotDone && (status.includes('selesai') || status.includes('done') || status.includes('complete') || status === 'ya' || status === 'yes' || status === '1' || status === 'true');
          
          if (isDone) {
            names.push(name);
          }
        } else {
          // No status column in table — assume all listed rows are completed badges
          names.push(name);
        }
      });

      return names;
    }

    // Apply imported names to localStorage and refresh UI
    function applyImportedBadges(namesRaw) {
      const knownNames = skillBadges.map(b => b.name);
      const knownNorm = knownNames.map(n => normalizeName(n));

      const matched = [];
      const unmatched = [];

      namesRaw.forEach(raw => {
        const norm = normalizeName(raw);
        if (!norm) return;

        // Exact match first
        let idx = knownNorm.indexOf(norm);

        // Fallback partial match only if string length >= 5
        if (idx === -1 && norm.length >= 5) {
          idx = knownNorm.findIndex(k => (k.includes(norm) || norm.includes(k)) && Math.abs(k.length - norm.length) < 15);
        }

        if (idx !== -1) {
          matched.push(knownNames[idx]);
        } else {
          unmatched.push(raw.trim());
        }
      });

      const unique = [...new Set(matched)];
      localStorage.setItem('completed_skill_badges', JSON.stringify(unique));
      renderSkillBadges();
      updateTrackingDashboard();

      let msg = `✅ Berhasil menandai ${unique.length} skill badge sebagai selesai!`;
      if (unmatched.length > 0) {
        msg += `\n\n⚠️ ${unmatched.length} nama tidak cocok dengan daftar badge:\n- ${unmatched.slice(0, 5).join('\n- ')}${unmatched.length > 5 ? '\n...' : ''}`;
      }
      alert(msg);
    }

    window.importProgress = (event) => {
      const file = event.target.files[0];
      if (!file) return;
      event.target.value = '';

      const ext = file.name.split('.').pop().toLowerCase();

      // ── JSON import (legacy) ──────────────────────────────────────────────
      if (ext === 'json') {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const data = JSON.parse(e.target.result);
            if (Array.isArray(data)) {
              applyImportedBadges(data);
            } else {
              alert('Format JSON tidak valid. File harus berisi array nama badge.');
            }
          } catch {
            alert('Gagal membaca file JSON.');
          }
        };
        reader.readAsText(file);
        return;
      }

      // ── CSV import ────────────────────────────────────────────────────────
      if (ext === 'csv') {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const text = e.target.result;
            // Parse CSV — handle quoted fields and semicolon separator fallback
            const sep = text.includes(';') && !text.includes(',') ? ';' : ',';
            const rows = text.split(/\r?\n/).map(r =>
              r.split(sep).map(c => c.replace(/^"|"$/g, '').trim())
            ).filter(r => r.some(c => c));

            if (rows.length === 0) { alert('File CSV kosong.'); return; }
            const names = parseRowsForBadges(rows);
            if (names.length === 0) { alert('Tidak ada data nama badge yang ditemukan di CSV.'); return; }
            applyImportedBadges(names);
          } catch (err) {
            alert('Gagal membaca file CSV: ' + err.message);
          }
        };
        reader.readAsText(file, 'UTF-8');
        return;
      }

      // ── Excel (.xlsx / .xls) import ───────────────────────────────────────
      if (ext === 'xlsx' || ext === 'xls') {

        // Our "Ekspor Excel" button creates an HTML-table file saved as .xls.
        // DOMParser handles it perfectly. For real .xlsx binary files, use SheetJS.
        const tryHtmlParse = (text) => {
          try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, 'text/html');
            const tableRows = Array.from(doc.querySelectorAll('table tr'));
            if (tableRows.length === 0) return null;
            return tableRows.map(tr =>
              Array.from(tr.querySelectorAll('td, th')).map(cell => cell.textContent.trim())
            );
          } catch { return null; }
        };

        const parseExcel = (binaryData) => {
          try {
            const XLSX = window.XLSX;
            const wb = XLSX.read(binaryData, { type: 'binary' });
            const ws = wb.Sheets[wb.SheetNames[0]];
            return XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' })
              .map(r => r.map(c => String(c || '').trim()));
          } catch { return null; }
        };

        // Try HTML-parse first (works for our exported .xls files)
        const readerText = new FileReader();
        readerText.onload = (e) => {
          let rows = tryHtmlParse(e.target.result);

          const processRows = (rows) => {
            if (!rows || rows.length === 0) { alert('File Excel kosong atau tidak bisa dibaca.'); return; }
            const names = parseRowsForBadges(rows);
            if (names.length === 0) {
              alert('Tidak ada data badge yang bisa dibaca.\nPastikan ada baris dengan Status = SELESAI.');
              return;
            }
            applyImportedBadges(names);
          };

          if (rows && rows.some(r => r.some(c => c.toLowerCase().includes('nama') || c.toLowerCase().includes('badge')))) {
            // HTML parse succeeded and found the right table
            processRows(rows);
          } else {
            // Not HTML — try SheetJS for real .xlsx/.xls binary format
            const loadSheetJS = () => {
              const readerBin = new FileReader();
              readerBin.onload = (ev) => {
                rows = parseExcel(ev.target.result);
                processRows(rows);
              };
              readerBin.readAsBinaryString(file);
            };

            if (window.XLSX) {
              loadSheetJS();
            } else {
              const s = document.createElement('script');
              s.src = 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js';
              s.onload = loadSheetJS;
              s.onerror = () => alert('Gagal memuat library Excel. Periksa koneksi internet kamu.');
              document.head.appendChild(s);
            }
          }
        };
        readerText.readAsText(file, 'UTF-8');
        return;
      }

      alert('Format file tidak didukung. Gunakan .json, .csv, atau .xlsx/.xls');
    };

    window.resetProgress = () => {
      if (confirm('Apakah Anda yakin ingin mereset seluruh progres tracking skill badges?')) {
        localStorage.setItem('completed_skill_badges', '[]');
        renderSkillBadges();
        updateTrackingDashboard();
      }
    };

    // ── ACCORDION TOGGLE ────────────────────────────────────────────────────
    
    window.toggleGameCollapse = (gameId) => {
      const card = document.getElementById(gameId);
      if (card.classList.contains('expired-game')) return;
      const content = card.querySelector('.game-content');
      
      const isOpen = card.classList.contains('open');

      // Close all other games first for Accordion effect
      document.querySelectorAll('.game-collapse-card').forEach(otherCard => {
        otherCard.classList.remove('open');
        otherCard.querySelector('.game-content').style.maxHeight = null;
      });

      if (!isOpen) {
        card.classList.add('open');
        content.style.maxHeight = content.scrollHeight + "px";
      }
    };

    // ── SEARCH FILTER ───────────────────────────────────────────────────────
    
    function filterLabs() {
      const query = document.getElementById('lab-search-input').value.toLowerCase().trim();

      if (currentMainTab === 'arcade') {
        const allGames = [...julyArcadeGames, ...augustArcadeGames];
        allGames.forEach(game => {
          const gameCard = document.getElementById(game.id);
          if (!gameCard) return;
          const labItems = gameCard.querySelectorAll('.lab-item');
          let visibleLabsCount = 0;

          labItems.forEach(item => {
            const searchName = item.getAttribute('data-search-name');
            if (searchName.includes(query) || game.name.toLowerCase().includes(query)) {
              item.style.display = '';
              visibleLabsCount++;
            } else {
              item.style.display = 'none';
            }
          });

          // Show or hide whole game card based on match count
          if (visibleLabsCount > 0 || game.name.toLowerCase().includes(query) || query === '') {
            gameCard.style.display = '';
            
            // Auto open the game if there is a query search match inside it
            if (query.length > 0) {
              gameCard.classList.add('open');
              const content = gameCard.querySelector('.game-content');
              if (content) content.style.maxHeight = content.scrollHeight + "px";
            }
          } else {
            gameCard.style.display = 'none';
          }
        });
      } else {
        const cards = document.querySelectorAll('.skill-badge-card-item');
        cards.forEach(card => {
          const searchName = card.getAttribute('data-search-name');
          if (searchName.includes(query)) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      }
    }

    function selectSubLabVideo(vUrl, dUrl, btnEl) {
window.selectSubLabVideo = selectSubLabVideo;

      const container = btnEl.parentElement;
      if (container) {
        container.querySelectorAll('.sublab-btn').forEach(btn => {
          btn.style.background = 'rgba(255,255,255,0.05)';
          btn.style.color = 'var(--text-light)';
          btn.style.border = '1px solid var(--glass-border)';
          btn.style.fontWeight = '500';
        });
      }
      btnEl.style.background = 'var(--g-blue)';
      btnEl.style.color = 'white';
      btnEl.style.border = '1px solid var(--g-blue)';
      btnEl.style.fontWeight = '700';

      const iframe = document.getElementById('sublab-iframe');
      if (iframe && vUrl) {
        let embedUrl = vUrl;
        if (embedUrl.includes('youtube.com/watch?v=')) {
          embedUrl = embedUrl.replace('youtube.com/watch?v=', 'youtube.com/embed/').split('&')[0];
        } else if (embedUrl.includes('youtu.be/')) {
          embedUrl = embedUrl.replace('youtu.be/', 'youtube.com/embed/').split('?')[0];
        }
        iframe.src = embedUrl;
      }



      const resourcesPanel = document.getElementById('modal-video-resources');
      const resourceLinkBtn = document.getElementById('btn-video-resource-link');
      if (dUrl && resourcesPanel && resourceLinkBtn) {
        resourcesPanel.style.display = 'flex';
        resourceLinkBtn.href = dUrl;
        const resInfo = getResourceInfo(dUrl);
        if (resInfo) {
          resourceLinkBtn.innerHTML = `<i class="${resInfo.icon}"></i> ${resInfo.label}`;
          resourceLinkBtn.setAttribute('style', `padding: 6px 14px; font-size: 0.78rem; border-radius: 6px; font-weight: 700; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; ${resInfo.btnStyle} box-shadow: 0 0 10px rgba(0,0,0,0.3);`);
        }
      } else if (resourcesPanel) {
        resourcesPanel.style.display = 'none';
      }
    };

    async function openSolutionModal(labTitle, videoUrl, driveUrl, scriptFile, lang, note, subLabsEncoded) {
window.openSolutionModal = openSolutionModal;

      const modal = document.getElementById('solution-modal');
      const titleEl = document.getElementById('modal-lab-title');
      const videoContainer = document.getElementById('modal-video-container');
      const sublabsNavContainer = document.getElementById('modal-sublabs-container');
      if (sublabsNavContainer) {
        sublabsNavContainer.style.display = 'none';
        sublabsNavContainer.innerHTML = '';
      }
      const videoPanelTitle = document.getElementById('video-panel-title');
      const codeContentEl = document.getElementById('modal-code-content');
      const codeLangEl = document.getElementById('modal-code-lang');
      const downloadLink = document.getElementById('btn-download-link');

      // Set Title
      titleEl.textContent = labTitle;

      // Set Aduan Form URL
      const aduanLink = document.getElementById('btn-aduan-link');
      const aduanBanner = document.getElementById('modal-aduan-banner');
      if (aduanLink) {
        aduanLink.href = ADUAN_FORM_URL;
      }
      if (aduanBanner) {
        aduanBanner.classList.remove('aduan-flash-glow');
      }

      // Set Code Language Label
      codeLangEl.textContent = lang || 'Aset Bantuan';

      // Reset Copy Button
      const copyBtn = document.getElementById('btn-copy-script');
      copyBtn.classList.remove('success');
      copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i> <span>Salin</span>';
      copyBtn.style.display = 'inline-flex';
      downloadLink.style.display = 'inline-flex';

      // Reset Code Note
      const codeNoteEl = document.getElementById('modal-code-note');
      const codeNoteTextEl = document.getElementById('modal-code-note-text');
      if (codeNoteEl && codeNoteTextEl) {
        if (note) {
          codeNoteEl.style.display = 'block';
          codeNoteTextEl.textContent = note;
        } else {
          codeNoteEl.style.display = 'none';
          codeNoteTextEl.textContent = '';
        }
      }

      // 1. Video/Drive/Resource Render
      const resourcesPanel = document.getElementById('modal-video-resources');
      const resourceLinkBtn = document.getElementById('btn-video-resource-link');
      
      if (resourcesPanel && resourceLinkBtn) {
        resourcesPanel.style.display = 'none'; // Default hidden
      }

      let subLabs = [];
      if (subLabsEncoded) {
        try {
          subLabs = JSON.parse(decodeURIComponent(subLabsEncoded));
        } catch(e) {}
      }

      if (subLabs && subLabs.length > 0) {
        if (videoPanelTitle) {
          videoPanelTitle.innerHTML = `<i class="fa-solid fa-list-ol" style="color: var(--g-blue);"></i> Video Tutorial Lab (${subLabs.length} Modul)`;
        }
        
        let subNavHTML = '<div class="sublabs-nav-wrapper" style="display: flex; gap: 6px; flex-wrap: wrap; max-height: 120px; overflow-y: auto;">';
        subLabs.forEach((sub, idx) => {
          const activeStyle = idx === 0 
            ? 'background: var(--g-blue); color: white; border: 1px solid var(--g-blue); font-weight: 700;' 
            : 'background: rgba(255,255,255,0.05); color: var(--text-light); border: 1px solid var(--glass-border); font-weight: 500;';
          subNavHTML += `
            <button class="btn sublab-btn" style="padding: 6px 12px; font-size: 0.76rem; border-radius: 6px; cursor: pointer; transition: all 0.2s; ${activeStyle}"
              onclick="selectSubLabVideo('${sub.videoUrl}', '${sub.driveUrl || ''}', this)">
              ${sub.name}
            </button>
          `;
        });
        subNavHTML += '</div>';

        if (sublabsNavContainer) {
          sublabsNavContainer.style.display = 'block';
          sublabsNavContainer.innerHTML = subNavHTML;
        }

        const firstSub = subLabs[0];
        let embedUrl = firstSub.videoUrl || videoUrl;
        if (embedUrl.includes('youtube.com/watch?v=')) {
          embedUrl = embedUrl.replace('youtube.com/watch?v=', 'youtube.com/embed/').split('&')[0];
        } else if (embedUrl.includes('youtu.be/')) {
          embedUrl = embedUrl.replace('youtu.be/', 'youtube.com/embed/').split('?')[0];
        }

        videoContainer.innerHTML = `
          <iframe id="sublab-iframe" src="${embedUrl}" title="YouTube video player" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowfullscreen></iframe>
        `;

        if (firstSub.driveUrl && resourcesPanel && resourceLinkBtn) {
          resourcesPanel.style.display = 'flex';
          resourceLinkBtn.href = firstSub.driveUrl;
          const resInfo = getResourceInfo(firstSub.driveUrl);
          if (resInfo) {
            resourceLinkBtn.innerHTML = `<i class="${resInfo.icon}"></i> ${resInfo.label}`;
            resourceLinkBtn.setAttribute('style', `padding: 6px 14px; font-size: 0.78rem; border-radius: 6px; font-weight: 700; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; ${resInfo.btnStyle} box-shadow: 0 0 10px rgba(0,0,0,0.3);`);
          }
        }
      } else if (videoUrl) {
        let embedUrl = videoUrl;
        if (embedUrl.includes('youtube.com/watch?v=')) {
          embedUrl = embedUrl.replace('youtube.com/watch?v=', 'youtube.com/embed/').split('&')[0];
        } else if (embedUrl.includes('youtu.be/')) {
          embedUrl = embedUrl.replace('youtu.be/', 'youtube.com/embed/').split('?')[0];
        }
        if (videoPanelTitle) {
          videoPanelTitle.innerHTML = `<i class="fa-brands fa-youtube" style="color: var(--g-red);"></i> Panduan Video Tutorial`;
        }
        videoContainer.innerHTML = `
          <iframe src="${embedUrl}" title="YouTube video player" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowfullscreen></iframe>
        `;
        
        // Show resources panel if driveUrl is also present
        if (driveUrl && resourcesPanel && resourceLinkBtn) {
          resourcesPanel.style.display = 'flex';
          resourceLinkBtn.href = driveUrl;
          
          const resInfo = getResourceInfo(driveUrl);
          if (resInfo) {
            resourceLinkBtn.innerHTML = `<i class="${resInfo.icon}"></i> ${resInfo.label}`;
            resourceLinkBtn.setAttribute('style', `padding: 6px 14px; font-size: 0.78rem; border-radius: 6px; font-weight: 700; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; ${resInfo.btnStyle} box-shadow: 0 0 10px rgba(0,0,0,0.3);`);
          }
        }
      } else if (driveUrl) {
        const resInfo = getResourceInfo(driveUrl);
        if (videoPanelTitle) {
          videoPanelTitle.innerHTML = `<i class="${resInfo.icon}"></i> Panduan Tutorial (${resInfo.badgeText})`;
        }
        
        const descText = resInfo.type === 'github'
          ? 'Dokumen panduan atau kode solusi pengerjaan ini disimpan di repositori GitHub.'
          : resInfo.type === 'drive'
          ? 'Dokumen panduan atau video tutorial ini disimpan secara aman di Google Drive.'
          : resInfo.type === 'docs'
          ? 'Dokumen panduan atau spreadsheet bantuan ini dapat diakses via Google Docs/Sheets.'
          : 'Dokumen panduan atau artikel solusi pengerjaan ini dapat kamu akses langsung pada situs web terkait.';

        videoContainer.innerHTML = `
          <div class="drive-placeholder" style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 15px; text-align: center; padding: 30px 20px; background: rgba(255, 255, 255, 0.02); border: 1px dashed var(--glass-border); border-radius: var(--border-radius-sm); height: 100%; min-height: 200px;">
            <i class="${resInfo.icon}" style="font-size: 3.5rem; color: var(--g-blue);"></i>
            <div>
              <span style="font-size: 0.95rem; font-weight: 600; color: var(--text-light); display: block; margin-bottom: 6px;">${resInfo.label}</span>
              <span style="color: var(--text-muted); font-size: 0.78rem; display: block; max-width: 320px; margin: 0 auto 15px auto;">${descText}</span>
              <a href="${driveUrl}" target="_blank" class="btn" style="${resInfo.btnStyle} padding: 8px 18px; font-size: 0.8rem; display: inline-flex; align-items: center; gap: 8px; border-radius: 6px; text-decoration: none; font-weight: 700; box-shadow: 0 0 12px rgba(0,0,0,0.3);">
                <i class="fa-solid fa-up-right-from-square"></i> ${resInfo.label}
              </a>
            </div>
          </div>
        `;
      } else if (note) {
        if (videoPanelTitle) {
          videoPanelTitle.innerHTML = `<i class="fa-solid fa-clipboard-list" style="color: var(--g-yellow);"></i> Instruksi Pengerjaan Lab`;
        }
        videoContainer.innerHTML = `
          <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 25px 20px; background: rgba(245, 158, 11, 0.08); border: 1px dashed rgba(245, 158, 11, 0.4); border-radius: var(--border-radius-sm); height: 100%; min-height: 220px;">
            <i class="fa-solid fa-bullhorn" style="font-size: 3rem; color: var(--g-yellow); margin-bottom: 12px;"></i>
            <span style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; font-weight: 700; color: var(--g-yellow); margin-bottom: 6px;">PETUNJUK UTAMA:</span>
            <h4 style="font-size: 1.05rem; font-weight: 700; color: #fef08a; line-height: 1.5; margin-bottom: 12px; max-width: 90%;">${escapeHtml(note)}</h4>
            <p style="font-size: 0.78rem; color: var(--text-muted); margin: 0; line-height: 1.4;">
              <i class="fa-solid fa-circle-info" style="margin-right: 4px; color: var(--g-yellow);"></i> Lab ini tidak memerlukan video tutorial atau berkas script tambahan. Cukup ikuti petunjuk di atas.
            </p>
          </div>
        `;
      } else {
        if (videoPanelTitle) {
          videoPanelTitle.innerHTML = `<i class="fa-solid fa-clock" style="color: var(--text-muted);"></i> Status Panduan`;
        }
        videoContainer.innerHTML = `
          <div class="video-placeholder">
            <i class="fa-solid fa-clock"></i>
            <span style="font-size: 0.85rem; font-weight: 500;">Tutorial & Solusi Sedang Disiapkan<br><span style="color: var(--text-muted); font-size: 0.75rem;">Akan diperbarui secara berkala oleh Fasilitator.</span></span>
          </div>
        `;
      }

      // 2. Fetch Script File dynamically
      codeContentEl.textContent = 'Loading script content...';
      currentSelectedScript = '';
      downloadLink.href = '#';

      const isXlsx = scriptFile && scriptFile.toLowerCase().endsWith('.xlsx');

      if (isXlsx) {
        copyBtn.style.display = 'none';
        downloadLink.style.display = 'none';
        if (downloadLink.parentElement) downloadLink.parentElement.style.display = 'none';
        codeLangEl.textContent = 'Spreadsheet (.xlsx)';
        codeContentEl.textContent = `[INFO PENTING SPREADSHEET]\n\nNama berkas: ${scriptFile}\n\nUntuk menghindari file spreadsheet (.xlsx) korup atau tidak terbaca saat diunduh, unduhan langsung dinonaktifkan di modal ini.\n\nSilakan unduh berkas spreadsheet tersebut secara langsung melalui folder Google Drive di panel sebelah kiri bersama dengan berkas panduan tutorialnya.`;
      } else if (scriptFile) {
        copyBtn.style.display = 'inline-flex';
        downloadLink.style.display = 'inline-flex';
        if (downloadLink.parentElement) downloadLink.parentElement.style.display = 'flex';
        codeLangEl.textContent = lang || 'Shell Script';
        try {
          const res = await fetch(`/scripts/${scriptFile}?t=${Date.now()}`);
          if (res.ok) {
            const scriptText = await res.text();
            currentSelectedScript = scriptText;
            codeContentEl.textContent = scriptText;

            // Generate blob URL for download button
            const blob = new Blob([scriptText], { type: 'text/plain' });
            const blobUrl = URL.createObjectURL(blob);
            downloadLink.href = blobUrl;
            downloadLink.setAttribute('download', scriptFile);
          } else {
            codeContentEl.textContent = `Error: Gagal memuat berkas bantuan (${res.status}).`;
            copyBtn.style.display = 'none';
            downloadLink.style.display = 'none';
            if (downloadLink.parentElement) downloadLink.parentElement.style.display = 'none';
          }
        } catch (err) {
          codeContentEl.textContent = 'Error: Gagal menyambung ke server untuk memuat berkas.';
          copyBtn.style.display = 'none';
          downloadLink.style.display = 'none';
          if (downloadLink.parentElement) downloadLink.parentElement.style.display = 'none';
          console.error(err);
        }
      } else {
        copyBtn.style.display = 'none';
        downloadLink.style.display = 'none';
        if (downloadLink.parentElement) downloadLink.parentElement.style.display = 'none';

        if (note) {
          codeLangEl.textContent = 'Petunjuk & Resources';
          codeContentEl.textContent = `# PETUNJUK & RESOURCES TASK LAB\n\n${note}`;
        } else if (driveUrl) {
          const resInfo = getResourceInfo(driveUrl);
          codeLangEl.textContent = resInfo ? resInfo.badgeText : 'Sumber Belajar';
          codeContentEl.textContent = `# PANDUAN PADA LINK TAUTAN\n\nSilakan ikuti petunjuk pengerjaan lengkap pada tombol [${resInfo ? resInfo.label : 'Buka Link'}] di panel sebelah kiri.`;
        } else {
          codeLangEl.textContent = 'Status Solusi';
          codeContentEl.textContent = `# Solusi Belum Tersedia\n\nBelum ada berkas script atau panduan khusus untuk lab ini.`;
        }
      }

      // Set saved author name if exists
      const savedAuthor = localStorage.getItem('comment_author_preference');
      if (savedAuthor) {
        document.getElementById('comment-author-input').value = savedAuthor;
      } else {
        document.getElementById('comment-author-input').value = '';
      }

      // Reset comment form fields
      document.getElementById('comment-text-input').value = '';

      // Set default selected status
      selectCommentStatus(true);

      // Load comments
      currentLabName = labTitle;
      loadComments(labTitle);

      // Show Modal
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    };

    function closeSolutionModal() {
window.closeSolutionModal = closeSolutionModal;

      const modal = document.getElementById('solution-modal');
      const videoContainer = document.getElementById('modal-video-container');
      
      // Stop YouTube Video playback by clearing iframe source
      videoContainer.innerHTML = '';

      modal.classList.remove('open');
      document.body.style.overflow = '';
    };

    window.closeModalOnBackdrop = (event) => {
      const modalContainer = document.querySelector('.modal-container');
      if (!modalContainer.contains(event.target)) {
        closeSolutionModal();
      }
    };

    window.copyModalScript = () => {
      if (!currentSelectedScript) return;

      navigator.clipboard.writeText(currentSelectedScript)
        .then(() => {
          const copyBtn = document.getElementById('btn-copy-script');
          copyBtn.classList.add('success');
          copyBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i> <span>Tersalin!</span>';

          setTimeout(() => {
            copyBtn.classList.remove('success');
            copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i> <span>Salin</span>';
          }, 2000);
        })
        .catch(err => {
          console.error('Failed to copy text: ', err);
        });
    };

    // Helper to escape HTML tags inside dynamic strings
    function escapeHtml(text) {
      return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    }

    // ── COMMENTS & FEEDBACK LOGIC ───────────────────────────────────────────
    let currentLabName = '';
    let currentIsWorkingSelected = true;
    let commentFallbackMode = false;

    function selectCommentStatus(isWorks) {
window.selectCommentStatus = selectCommentStatus;

      currentIsWorkingSelected = isWorks;
      const optWorks = document.getElementById('option-works');
      const optBroken = document.getElementById('option-broken');
      const aduanBanner = document.getElementById('modal-aduan-banner');
      if (isWorks) {
        optWorks.classList.add('active-works');
        optBroken.classList.remove('active-broken');
        if (aduanBanner) {
          aduanBanner.classList.remove('aduan-flash-glow');
        }
      } else {
        optWorks.classList.remove('active-works');
        optBroken.classList.add('active-broken');
        if (aduanBanner) {
          aduanBanner.classList.add('aduan-flash-glow');
          aduanBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
    };

    async function loadComments(labName) {
window.loadComments = loadComments;

      const listEl = document.getElementById('modal-comments-list');
      const countEl = document.getElementById('comment-stat-count');
      const percentEl = document.getElementById('comment-stat-percent');
      const statusTextEl = document.querySelector('#comment-backend-status span');
      const statusIconEl = document.querySelector('#comment-backend-status i');

      listEl.innerHTML = '<p style="text-align: center; color: var(--text-muted); font-size: 0.85rem; padding: 20px;">Memuat komentar...</p>';

      let comments = [];
      commentFallbackMode = false;

      try {
        const res = await fetch(`/api/comments?lab_name=${encodeURIComponent(labName)}&t=${Date.now()}`);
        if (res.ok) {
          comments = await res.json();
          statusTextEl.textContent = 'Koneksi cloud database aktif.';
          statusIconEl.className = 'fa-solid fa-circle-check text-green';
        } else if (res.status === 503 || res.status === 404) {
          throw new Error('Database service unavailable or table missing');
        } else {
          throw new Error(`HTTP Error ${res.status}`);
        }
      } catch (err) {
        console.warn('Backend database not configured or error occurs, falling back to LocalStorage:', err);
        commentFallbackMode = true;
        statusTextEl.textContent = 'Database belum aktif. Menggunakan penyimpanan browser lokal.';
        statusIconEl.className = 'fa-solid fa-circle-info text-yellow';

        // Load from LocalStorage
        const localComments = localStorage.getItem(`comments_${labName}`);
        comments = localComments ? JSON.parse(localComments) : [];
      }

      // Render Comments
      listEl.innerHTML = '';
      if (comments.length === 0) {
        listEl.innerHTML = '<p style="text-align: center; color: var(--text-muted); font-size: 0.82rem; padding: 30px 20px; font-style: italic;">Belum ada komentar untuk lab ini. Jadilah yang pertama memberikan feedback!</p>';
        countEl.innerHTML = '<i class="fa-solid fa-message"></i> <span>0 Komentar</span>';
        percentEl.style.display = 'none';
        return;
      }

      // Calculate stats
      const worksCount = comments.filter(c => c.is_working).length;
      const percent = Math.round((worksCount / comments.length) * 100);
      
      countEl.innerHTML = `<i class="fa-solid fa-message"></i> <span>${comments.length} Komentar</span>`;
      percentEl.style.display = 'inline-flex';
      percentEl.innerHTML = percent >= 70 
        ? `<i class="fa-solid fa-thumbs-up" style="color: #10b981;"></i> <span>${percent}% Berhasil</span>`
        : `<i class="fa-solid fa-circle-exclamation" style="color: #ef4444;"></i> <span>${percent}% Berhasil</span>`;

      // Sort by date (descending)
      comments.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

      comments.forEach(c => {
        const item = document.createElement('div');
        item.className = 'comment-item';
        
        const badgeHTML = c.is_working 
          ? '<span class="comment-status-badge works"><i class="fa-solid fa-circle-check"></i> Works</span>' 
          : '<span class="comment-status-badge broken"><i class="fa-solid fa-circle-xmark"></i> Kendala</span>';

        const authorName = escapeHtml(c.author);
        const commentText = escapeHtml(c.comment_text).replace(/\n/g, '<br>');
        const dateStr = new Date(c.created_at).toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });

        item.innerHTML = `
          <div class="comment-meta">
            <div class="comment-author">
              <i class="fa-solid fa-user-circle" style="font-size: 1.1rem; color: var(--text-muted);"></i>
              <span>${authorName}</span>
              ${badgeHTML}
            </div>
            <div class="comment-date">${dateStr}</div>
          </div>
          <div class="comment-text">${commentText}</div>
        `;
        listEl.appendChild(item);
      });
    };

    async function submitComment(event) {
window.submitComment = submitComment;

      event.preventDefault();
      
      const authorInput = document.getElementById('comment-author-input');
      const textInput = document.getElementById('comment-text-input');
      
      const author = authorInput.value.trim() || 'Anonim';
      const comment_text = textInput.value.trim();

      if (!comment_text) return;

      const newComment = {
        lab_name: currentLabName,
        author,
        comment_text,
        is_working: currentIsWorkingSelected,
        created_at: new Date().toISOString()
      };

      try {
        if (commentFallbackMode) {
          throw new Error('Fallback mode enabled');
        }

        const res = await fetch('/api/comments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newComment)
        });

        if (!res.ok) {
          throw new Error(`HTTP Error ${res.status}`);
        }
      } catch (err) {
        console.warn('Submitting to API failed, saving to LocalStorage instead:', err);
        // Save to LocalStorage
        const localComments = localStorage.getItem(`comments_${currentLabName}`);
        const comments = localComments ? JSON.parse(localComments) : [];
        comments.push(newComment);
        localStorage.setItem(`comments_${currentLabName}`, JSON.stringify(comments));
      }

      // Reset textarea and reload
      textInput.value = '';
      
      // Save author name to LocalStorage for future comments
      // localStorage.removeItem('comment_author_preference');

      // Reload
      await loadComments(currentLabName);
    };
  