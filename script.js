document.addEventListener('DOMContentLoaded', function() {
    const newsContainer = document.getElementById('news-container');
    const organizationsContainer = document.getElementById('organizations-container');
    const sdgSelect = document.getElementById('sdg-select');

    sdgSelect.addEventListener('change', fetchNewsData);

    // Function to fetch news data based on selected SDG
    function fetchNewsData() {
        const sdg = sdgSelect.value.replace(/_/g, ' ');
        let keywords = '';

        switch (sdg) {
            case 'No Poverty':
                keywords = 'poverty, economic development, financial inclusion';
                break;
            case 'Zero Hunger':
                keywords = 'hunger, food security, nutrition, agriculture';
                break;
            case 'Good Health and Well-being':
                keywords = 'health, healthcare, wellbeing, disease prevention';
                break;
            case 'Quality Education':
                keywords = 'education, literacy, schooling, learning';
                break;
            case 'Gender Equality':
                keywords = 'gender equality, women empowerment, gender rights';
                break;
            case 'Clean Water and Sanitation':
                keywords = 'clean water, sanitation, hygiene, water access';
                break;
            case 'Affordable and Clean Energy':
                keywords = 'clean energy, renewable energy, sustainable energy, energy access';
                break;
            case 'Decent Work and Economic Growth':
                keywords = 'decent work, economic growth, employment, job creation';
                break;
            case 'Industry Innovation and Infrastructure':
                keywords = 'innovation, infrastructure, industry, technological advancement';
                break;
            case 'Reduced Inequality':
                keywords = 'inequality, social inclusion, economic disparity, social justice';
                break;
            case 'Sustainable Cities and Communities':
                keywords = 'sustainable cities, urban development, community planning, urban sustainability';
                break;
            case 'Responsible Consumption and Production':
                keywords = 'sustainable consumption, production, waste management, recycling';
                break;
            case 'Climate Action':
                keywords = 'climate change, global warming, environmental protection, sustainability';
                break;
            case 'Life Below Water':
                keywords = 'marine life, ocean conservation, aquatic ecosystems, sea protection';
                break;
            case 'Life on Land':
                keywords = 'biodiversity, land conservation, wildlife protection, forest management';
                break;
            case 'Peace and Justice Strong Institutions':
                keywords = 'peace, justice, strong institutions, governance';
                break;
            case 'Partnerships to achieve the Goal':
                keywords = 'partnerships, global cooperation, sustainable development, SDG partnerships';
                break;
        }

        const apiKey = '1be4b3d964064772b3769f40c2bfa9de'; // Provided NewsAPI key
        const proxyUrl = 'https://api.allorigins.win/get?url=';
        const apiUrl = encodeURIComponent(`https://newsapi.org/v2/everything?q=${keywords}&pageSize=10&language=en&sortBy=publishedAt&apiKey=${apiKey}`);
        const url = proxyUrl + apiUrl;

        console.log('Fetching news for SDG:', sdg, 'with keywords:', keywords);

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const newsData = JSON.parse(data.contents); // Parse the 'contents' field
                console.log('Parsed News Data:', newsData);
                newsContainer.innerHTML = '';
                if (newsData.articles && newsData.articles.length > 0) {
                    newsData.articles.forEach(article => {
                        const newsItem = document.createElement('div');
                        newsItem.className = 'news-item';
                        newsItem.innerHTML = `<h3><a href="${article.url}" target="_blank">${article.title}</a></h3><p>${article.description}</p>`;
                        newsContainer.appendChild(newsItem);
                    });
                } else {
                    newsContainer.innerHTML = '<p>No news articles found.</p>';
                }
            })
            .catch(error => {
                console.error('Error fetching news:', error);
                newsContainer.innerHTML = '<p>Error fetching news. Please try again later.</p>';
            });

        updateOrganizations(sdg);
    }

    // Function to update organizations based on selected SDG
    function updateOrganizations(sdg) {
        const organizationsData = {
            "No Poverty": [
                { name: "Save the Children", description: "Providing education, health care, and emergency aid to children in need.", donateLink: "https://www.savethechildren.org/us/ways-to-help/ways-to-give" },
                { name: "Oxfam", description: "Fighting poverty and injustice around the world.", donateLink: "https://secured.oxfam.ca/page/20905/donate/1" }
            ],
            "Zero Hunger": [
                { name: "World Food Programme", description: "Providing food assistance in emergencies and working with communities to improve nutrition.", donateLink: "https://www.wfp.org/donate" },
                { name: "Action Against Hunger", description: "Saving the lives of malnourished children while providing communities with access to safe water and sustainable solutions to hunger.", donateLink: "https://www.actionagainsthunger.org/donate" }
            ],
            "Good Health and Well-being": [
                { name: "Doctors Without Borders", description: "Medical assistance where it is needed most.", donateLink: "https://www.doctorswithoutborders.org/donate" },
                { name: "Partners In Health", description: "Providing high-quality health care to the poorest and most vulnerable communities.", donateLink: "https://www.pih.org/donate" }
            ],
            "Quality Education": [
                { name: "Khan Academy", description: "Providing a free, world‑class education for anyone, anywhere", donateLink: "https://donate.khanacademy.org/give/419869/#!/donation/checkout" },
                { name: "Room to Read", description: "Focusing on literacy and gender equality in education in low-income countries.", donateLink: "https://www.roomtoread.org/donate" }
            ],
            "Gender Equality": [
                { name: "UN Women", description: "Dedicated to gender equality and the empowerment of women.", donateLink: "https://donate.unwomen.org/" },
                { name: "Equality Now", description: "Working to promote the rights of women and girls around the world.", donateLink: "https://www.equalitynow.org/donate" }
            ],
            "Clean Water and Sanitation": [
                { name: "charity: water", description: "Bringing clean and safe drinking water to people in developing countries.", donateLink: "https://www.charitywater.org/donate" },
                { name: "Water.org", description: "Providing access to safe water and sanitation through affordable financing.", donateLink: "https://water.org/donate/" }
            ],
            "Affordable and Clean Energy": [
                { name: "SolarAid", description: "Combating poverty and climate change by providing access to solar lights in some of the most remote regions.", donateLink: "https://solar-aid.org/donate/" },
                { name: "Light Up The World", description: "Providing access to energy and life-changing technologies.", donateLink: "https://lutw.org/donate/" }
            ],
            "Decent Work and Economic Growth": [
                { name: "Kiva", description: "Providing crowdfunded loans to underserved communities for entrepreneurship and economic development.", donateLink: "https://www.kiva.org/donate" },
                { name: "Heifer International", description: "Ending hunger and poverty while caring for the Earth by empowering families to turn hunger and poverty into hope and prosperity.", donateLink: "https://www.heifer.org/give/donate-monthly.html" }
            ],
            "Industry Innovation and Infrastructure": [
                { name: "Engineers Without Borders", description: "Building a better world through engineering projects that empower communities.", donateLink: "https://www.ewb-usa.org/get-involved/donate/" },
                { name: "Habitat for Humanity", description: "Helping families build and improve places to call home.", donateLink: "https://secure.habitat.org/site/Donation2?df_id=6492&6492.donation=form1&keyword=button-header-single" }
            ],
            "Reduced Inequality": [
                { name: "Amnesty International", description: "Campaigning for a world where human rights are enjoyed by all.", donateLink: "https://www.amnesty.org/en/donate/" },
                { name: "Human Rights Watch", description: "Investigating and reporting on human rights abuses around the world.", donateLink: "https://donate.hrw.org/page/107245/donate/1?ea.tracking.id=EP2022EVpgdonate&promo_id=1000" }
            ],
            "Sustainable Cities and Communities": [
                { name: "World Resources Institute", description: "Promoting sustainable cities and communities through research and policy advocacy.", donateLink: "https://www.wri.org/donate" },
                { name: "ICLEI", description: "Local Governments for Sustainability network promoting sustainable urban development.", donateLink: "https://iclei.org/donate/" }
            ],
            "Responsible Consumption and Production": [
                { name: "Environmental Working Group", description: "Empowering people to live healthier lives in a healthier environment.", donateLink: "https://www.ewg.org/donate/" },
                { name: "The Story of Stuff Project", description: "Transforming the way we make, use, and throw away stuff to build a more sustainable and just world.", donateLink: "https://action.storyofstuff.org/donate/general_donations/?utm_source=reddonatebutton" }
            ],
            "Climate Action": [
                { name: "World Wildlife Fund", description: "Conserving nature and reducing the most pressing threats to the diversity of life on Earth.", donateLink: "https://protect.worldwildlife.org/page/67513/donate/1?en_og_source=Web_Donation&ea.tracking.id=Web_Topnav&supporter.appealCode=AWE2402OQ18299A01179RX" },
                { name: "Greenpeace", description: "Tackling climate change and promoting a green and peaceful future.", donateLink: "https://www.greenpeace.org/usa/donate/" }
            ],
            "Life Below Water": [
                { name: "Ocean Conservancy", description: "Working to protect the ocean from today's greatest global challenges.", donateLink: "https://oceanconservancy.org/ways-to-give/" },
                { name: "Oceana", description: "Protecting restoring ocean wildlife and habitats.", donateLink: "https://oceana.ca/en/donate-oceana-canada/" }
            ],
            "Life on Land": [
                { name: "Rainforest Alliance", description: "Working to conserve biodiversity and ensure sustainable livelihoods.", donateLink: "https://www.rainforest-alliance.org/donate" },
                { name: "The Nature Conservancy", description: "Conserving the lands and waters on which all life depends.", donateLink: "https://www.nature.org/en-us/membership-and-giving/donate-to-our-mission/"}
            ],
            "Peace and Justice Strong Institutions": [
                { name: "International Rescue Committee", description: "Responding to the world's worst humanitarian crises and helping people to survive and rebuild their lives.", donateLink: "https://help.rescue.org/donate" },
                { name: "Transparency International", description: "Working to stop corruption and promote transparency, accountability, and integrity at all levels and across all sectors of society.", donateLink: "https://www.transparency.org/en/donate" }
            ],
            "Partnerships to achieve the Goal": [
                { name: "United Nations Foundation", description: "Supporting the UN's work on the ground and raising awareness of global issues.", donateLink: "https://unfoundation.org/take-action/donate/" },
                { name: "Global Giving", description: "Connecting donors with grassroots projects around the world.", donateLink: "https://www.globalgiving.org/" }
            ]
        };

        organizationsContainer.innerHTML = '';
        const selectedOrganizations = organizationsData[sdg] || [];
        selectedOrganizations.forEach(org => {
            const orgItem = document.createElement('div');
            orgItem.className = 'organization-item';
            orgItem.innerHTML = `<h3>${org.name}</h3><p>${org.description}</p><a class="donate-button" href="${org.donateLink}" target="_blank">Donate</a>`;
            organizationsContainer.appendChild(orgItem);
        });
    }

    // Fetch initial data
    fetchNewsData();
});