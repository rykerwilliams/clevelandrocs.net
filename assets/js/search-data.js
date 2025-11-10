// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-profiles",
          title: "profiles",
          description: "Cleveland Rocs Player Profiles",
          section: "Navigation",
          handler: () => {
            window.location.href = "/profiles/";
          },
        },{id: "nav-articles",
          title: "articles",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/articles/";
          },
        },{id: "post-soup-on-sarpadia",
        
          title: "Soup on Sarpadia",
        
        description: "Sarpadian Cube Soup Party",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/articles/2025/11/04/Soup-on-Sarpadia/";
          
        },
      },{id: "post-thrash-bash-4",
        
          title: "Thrash Bash 4",
        
        description: "Thrash Bash 4",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/articles/2025/10/27/Thrash-Bash-4/";
          
        },
      },{id: "post-ohio-heroes-x-points",
        
          title: "Ohio Heroes X-Points",
        
        description: "Ohio Heroes X-Points Tournament",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/articles/2025/10/26/OhioHeroesXPoint/";
          
        },
      },{id: "post-fe40-world-championship-ii",
        
          title: "FE40 World Championship II",
        
        description: "Second Fallen Empires 40 World Championship",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/articles/2025/08/23/FEChamps2/";
          
        },
      },{id: "post-fe40-world-championship-i",
        
          title: "FE40 World Championship I",
        
        description: "Inaugural Fallen Empires 40 World Championship",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/articles/2024/03/30/FEChamps1/";
          
        },
      },{id: "post-protect-the-queen",
        
          title: "Protect the Queen",
        
        description: "FE Champs I Troy Drinkard Deck Tech and Tournament Report",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/articles/2024/03/30/FEChamps1-Drinkard/";
          
        },
      },{id: "post-2019-rocs-old-school-tournament",
        
          title: "2019 Rocs Old School Tournament",
        
        description: "2019 Rocs Old School Tournament",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/articles/2019/02/25/2019-Bottlehouse/";
          
        },
      },{id: "news-the-rocs-are-going-to-thrash-bash-4",
          title: 'The Rocs are going to Thrash Bash 4!',
          description: "",
          section: "News",},{id: "news-the-rocs-are-going-to-bootleggers-ball-6",
          title: 'The Rocs are going to Bootleggers Ball 6!',
          description: "",
          section: "News",},{id: "profiles-kyle-wells",
          title: 'Kyle Wells',
          description: "",
          section: "Profiles",handler: () => {
              window.location.href = "/profiles/the-kyle-wells/";
            },},{id: "profiles-mike-klements",
          title: 'Mike Klements',
          description: "",
          section: "Profiles",handler: () => {
              window.location.href = "/profiles/firelights/";
            },},{id: "profiles-troy-drinkard",
          title: 'Troy Drinkard',
          description: "",
          section: "Profiles",handler: () => {
              window.location.href = "/profiles/drinkard/";
            },},{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%63%6C%65%76%65%6C%61%6E%64%72%6F%63%73%6D%74%67@%67%6D%61%69%6C.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-facebook',
        title: 'Facebook',
        section: 'Socials',
        handler: () => {
          window.open("https://facebook.com/253199322100602", "_blank");
        },
      },{
        id: 'social-instagram',
        title: 'Instagram',
        section: 'Socials',
        handler: () => {
          window.open("https://instagram.com/clevelandrocs", "_blank");
        },
      },{
        id: 'social-rss',
        title: 'RSS Feed',
        section: 'Socials',
        handler: () => {
          window.open("/feed.xml", "_blank");
        },
      },{
        id: 'social-x',
        title: 'X',
        section: 'Socials',
        handler: () => {
          window.open("https://twitter.com/clevelandrocsog", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
