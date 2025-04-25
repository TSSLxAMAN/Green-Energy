const panelOptions = [
    {
        name: "Loom Solar 375W Monocrystalline",
        brand: "Loom Solar",
        type: "Monocrystalline",
        wattage: 375,
        efficiency: "20%",
        price_inr: 12000,
        lifespan_years: 25,
        ideal_use: "Residential rooftops with limited space",
        image_url: "https://m.media-amazon.com/images/I/41X1EOKpykL.jpg",
        buyLink: "https://www.amazon.in/Loom-Solar-Panel-375w-Solutions/dp/B08N6RDKCF?&linkCode=ll1&tag=greensolarene-21&linkId=822663eefd8217a0262e8460ad871810&language=en_IN&ref_=as_li_ss_tl"
    },
    {
        name: "Advon 400W Monocrystalline",
        brand: "Advon",
        type: "Monocrystalline",
        wattage: 400,
        efficiency: "20%",
        price_inr: 13000,
        lifespan_years: 25,
        ideal_use: "High-efficiency residential and commercial installations",
        image_url: "https://m.media-amazon.com/images/I/61kqod7P6IL._AC_UL640_FMwebp_QL65_.jpg",
        buyLink: "https://www.amazon.in/Advon-Solar-Panel-AM-400W-24V/dp/B096MSHZT7?&linkCode=ll1&tag=greensolarene-21&linkId=8bfea8003ab3eef21cf8659a8e329775&language=en_IN&ref_=as_li_ss_tl"
    },
    {
        name: "Waaree 330W Polycrystalline",
        brand: "Waaree",
        type: "Polycrystalline",
        wattage: 330,
        efficiency: "17%",
        price_inr: 8500,
        lifespan_years: 20,
        ideal_use: "Budget-friendly installations with ample space",
        image_url: "https://m.media-amazon.com/images/I/61kqod7P6IL._AC_UL640_FMwebp_QL65_.jpg",
        buyLink: "https://www.amazon.in/WAAREE-Solar-Panel-Polycrystalline-Cells/dp/B0D92DW5T3?crid=AEHVNH0V5A27&dib=eyJ2IjoiMSJ9.k2pKlW9LkffB9LrD-Cqh2AsYFJItfDHNLc_-d44099U.UiulnvPJV6cGAVW-kqlnimMt0FP_OxB-k-MUkY8VnrI&dib_tag=se&keywords=Waaree%2B330W%2BPolycrystalline&qid=1745568493&s=garden&sprefix=waaree%2B330w%2Bpolycrystalline%2Clawngarden%2C262&sr=1-1&th=1&linkCode=ll1&tag=greensolarene-21&linkId=c8f7717d31fe153f9f3fd2c32d3bdcec&language=en_IN&ref_=as_li_ss_tl"
    },
    {
        name: "Microtek 165W Polycrystalline",
        brand: "Microtek",
        type: "Polycrystalline",
        wattage: 165,
        efficiency: "15%",
        price_inr: 5999,
        lifespan_years: 20,
        ideal_use: "Small-scale or portable applications",
        image_url: "https://m.media-amazon.com/images/I/519KRrtkp6L._AC_UL640_FMwebp_QL65_.jpg",
        buyLink: "https://www.amazon.in/Microtek-Polycrystalline-Solar-Module-Office/dp/B09XXFVYKW?crid=19E9A5KEH9YPS&dib=eyJ2IjoiMSJ9.W-RL2ZqKk-YO2XzBkO0eBamgfEzy1kTM37FIo9XCF-TOD6IgM2Ty72p21rQqMZ4KxOBHmN0sp9oTZNHKHpWQsMKQ4iQP-uBkjx1ypuaAlLiMc8NG2Cz8FW8mU2XVmAgp.gqlJeTdkm8VE_t5MDp1y1rTuBJtK8ovPEnOhvABKNmE&dib_tag=se&keywords=Microtek+165W+Polycrystalline&qid=1745568589&s=garden&sprefix=waaree+330w+polycrystalline%2Clawngarden%2C770&sr=1-1&linkCode=ll1&tag=greensolarene-21&linkId=9f0f8121e7736db8ae4af463d482efa3&language=en_IN&ref_=as_li_ss_tl"
    },
    {
        name: "Loom Solar 445W Monocrystalline",
        brand: "Loom Solar",
        type: "Monocrystalline",
        wattage: 445,
        efficiency: "20.5%",
        price_inr: 16000,
        lifespan_years: 25,
        ideal_use: "Large residential and commercial projects",
        image_url: "https://m.media-amazon.com/images/I/61nHkF5JLNL._SX679_.jpg",
        buyLink: "https://www.amazon.in/Loom-Solar-455W-24V-Bifacial-25-Generation/dp/B08XJV4VFW?&linkCode=ll1&tag=greensolarene-21&linkId=75fc3b21fc7490a984defc2d7912698f&language=en_IN&ref_=as_li_ss_tl"
    },
    {
        name: "WAAREE Solar Panel All Black 400 Watt (Pack of 2, 800W)",
        brand: "WAREE",
        type: "WSMDi-400",
        wattage: 400,
        efficiency: "20%",
        price_inr: 15899,
        lifespan_years: 25,
        ideal_use: "Versatile applications with efficiency needs",
        image_url: "https://a.media-amazon.com/images/I/7122T2BwWAL._SX679_.jpg",
        buyLink: "https://www.amazon.in/WAAREE-Solar-400-Pack-Panels/dp/B0C2V13XRD?crid=IBY87UDRAOWI&dib=eyJ2IjoiMSJ9.uWDr0og_Vju9YDZduLWA9m1CyU8a4V_xMAI85vW8k-qsBqVp8dVP-RXIX-h7FRq5nL-VUR48Zb34Go7mgsdGObsoI76Q0ivDXtQGuzaaVJQLHQcNd0sCyNVcgQwFnr-6MhMBNaU7QpRCknPchxMS3WD-aPsFq2H8E7H58hu8ugDO4RVCxyXyrF9HEfOFHyE_x3W2aujJuGKC5sTH5YLqPU3OONuCzYRDg6F8c0AeImPl_-UfdepmD0oRVuNIRlBoOCTAhIZivErPFEEwGMMDoSQsuByJDoUN_5a4O8CTgOw.-HgDXgzpq6t8l7zNpKpaJDvgyTB8vxU1oKbtos38M2Q&dib_tag=se&keywords=410+w+solar+panel&qid=1745568916&s=garden&sprefix=410+w+sola%2Clawngarden%2C790&sr=1-4&linkCode=ll1&tag=greensolarene-21&linkId=d89f1935ad4947c6ded52166b326b5b2&language=en_IN&ref_=as_li_ss_tl"
    },
    {
        name: "Eastman EMP125W - 125W Mono Perc Non-DCR Solar Panel",
        brand: "Eastman Energy",
        type: "Monocrystalline Silicon",
        wattage: 125,
        efficiency: "20%",
        price_inr: 3999,
        lifespan_years: 25,
        ideal_use: "Suitable for Home, Office & Shop",
        image_url: "https://a.media-amazon.com/images/I/515kvxa00IL._SX679_.jpg",
        buyLink: "https://www.amazon.in/Eastman-EMP125W-Suitable-Warranty-Performance/dp/B0DSC8K7XC?crid=3FXKCMCN4TAJT&dib=eyJ2IjoiMSJ9.1ia02qthREaKmHKgq2sJoaQdwQko8EcB8Sb9UYNwq3SFFJpFB96IuobBJprUeOxe3vrpXsolhtVGCdOfzcVvuncacH0iUfqY_kZFcyyEM0dAX3CIQcVgVptUkXcCsg1VtCXGnmtxY0HogshbDVDfmqh0t_tHbrhmspyJptNNFUZewBesS_gn6J8g5ovh7c7pGX71x99mPseXBbOu-7hGzyGNPBRq80LOvXIkVjwA-FlZpEP6-9EOeOllCqcr8TUWVJxmvDWjkgiVXqC7v6jTJh8tWsfNZpxGbkNGqqAmRCI.Jd5yyCs1QN25ExO8MnMpc52XLMC5D4Rb6ni3BolQIMY&dib_tag=se&keywords=Eastman+EMP125W+-+125W+Mono+Perc+Non-DCR+Solar+Panel&qid=1745569068&s=garden&sprefix=eastman+emp125w+-+125w+mono+perc+non-dcr+solar+panel%2Clawngarden%2C358&sr=1-4&linkCode=ll1&tag=greensolarene-21&linkId=379d5f658fa0efc3fb3b2c41b320d9d7&language=en_IN&ref_=as_li_ss_tl"
    },
    {
        name: "Luminous Half Cut Mono Crystalline Solar Panel 550W/24V ",
        brand: "Luminous",
        type: "Polyvinyl Chloride",
        wattage: 550,
        efficiency: "20%",
        price_inr: 12239,
        lifespan_years: 25,
        ideal_use: "Ideal for Residential & Commercial Use ",
        image_url: "https://a.media-amazon.com/images/I/41+WVDV5UwL.jpg",
        buyLink: "https://www.amazon.in/Luminous-Crystalline-Solar-Panel-550w/dp/B0D8V2HNNL?crid=129K0YGBZZDDE&dib=eyJ2IjoiMSJ9.H3WeEvDzpNibXe9C7Mh7wsS0i5EC5L9fNWn9qK0cwP_NP-iz9ZokO2WvbHOul0t_Hf-aa2KRCSiZel4Jw2u2lIYzQK31CPW42xIAY-PHR1eeV0FuK9P3_J0o_op0OCw2voSLSz4v3o0TvSMpil0CpW4rEw4TO6T14OsuLhN7sR6YyctH8b2vKv9Osvnnlqcx9GTqjX2NLYAkVSWsuoWyugtnPZVU4wv0wn5p8gtDw-CC8BcF9LyhTGKL1Rfvai-BcwnWpTcEgR5Hvcw5GnXplX-yNOFMS6wCJmvblCsi24c.pAaA9TXCkCRm1Hg9E41ghkTZwhzprvqhDOVvrHInGAY&dib_tag=se&keywords=Luminous+Half+Cut+Mono+Crystalline+Solar+Panel+550W%2F24V&nsdOptOutParam=true&qid=1745569127&s=garden&sprefix=eastman+emp125w+-+125w+mono+perc+non-dcr+solar+panel%2Clawngarden%2C549&sr=1-4&linkCode=ll1&tag=greensolarene-21&linkId=ef6345a6e92217919cadba6fad6de5e9&language=en_IN&ref_=as_li_ss_tl"
    }
];

export default panelOptions;
