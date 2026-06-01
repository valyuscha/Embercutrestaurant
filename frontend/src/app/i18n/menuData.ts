type MenuItem = { name: string; desc: string; price: string; seasonal?: boolean };
type MenuSection = { category: string; subtitle: string; items: MenuItem[] };

const pl: MenuSection[] = [
  {
    category: "Przystawki",
    subtitle: "Starters",
    items: [
      { name: "Befsztyk Tatarski z Polędwicy", desc: "Ręcznie siekany, żółtko jaj, kaparki, korniszony, cebula dymka, tost brioche", price: "58 zł" },
      { name: "Szpik Kostny z Chimichurri", desc: "Pieczony szpik wołowy z ziołowym sosem chimichurri i chrupiącym pieczywem zakwasowym", price: "46 zł" },
      { name: "Carpaccio z Polędwicy Wołowej", desc: "Cienko krojona surowa polędwica, parmezan 24 mies., rukola, oliwa truflowa, kaparki", price: "52 zł" },
      { name: "Burrata z Truflą i Pomidorami Heritage", desc: "Świeża burrata, oliwa truflowa, pomidory heritage, bazylia, sól morska Maldon", price: "44 zł" },
      { name: "Wędzona Pieczeń Wołowa", desc: "Plasterki wędzonej wołowiny dojrzewającej, chrzan kremowy, pieczywo na zakwasie, ogórek kiszony", price: "54 zł" },
      { name: "Krewetki Tygrysie z Grilla", desc: "Grillowane na węglu, masło czosnkowe, sok z cytryny, świeże zioła, bagietka", price: "64 zł" },
    ],
  },
  {
    category: "Zupy",
    subtitle: "Soups",
    items: [
      { name: "Zupa Cebulowa z Gruyère", desc: "Klasyczna zupa cebulowa wolno duszona, grzanka, ser Gruyère zapiekany", price: "32 zł", seasonal: true },
      { name: "Bisque z Homara", desc: "Kremowa zupa z homara z brandy, śmietaną i papryką cayenne", price: "48 zł" },
      { name: "Bulion Wołowy z Makaronem", desc: "Klarowny bulion z dojrzewającej wołowiny, makaron własnej roboty, pietruszka", price: "34 zł" },
      { name: "Zupa Dnia", desc: "Zapytaj kelnera o dzisiejszą propozycję szefa kuchni — zmieniana codziennie", price: "28 zł", seasonal: true },
    ],
  },
  {
    category: "Steki",
    subtitle: "Our Steaks",
    items: [
      { name: "Ribeye 350g", desc: "35-dniowe dojrzewanie na sucho, grill węglowy, masło ziołowe, sos au jus — wybierz wysmażenie", price: "149 zł" },
      { name: "T-Bone 500g", desc: "Polędwica i rostbef w jednym cięciu, 28-dniowe dojrzewanie, czarna sól hawajska, rozmaryn", price: "189 zł" },
      { name: "Polędwica Wołowa 200g", desc: "Najszlachetniejsze cięcie, médaillon, sos béarnaise lub sos pieprzowy — do wyboru", price: "138 zł" },
      { name: "Tomahawk 900g (dla 2 osób)", desc: "Spektakularny stek z kością, 42-dniowe dojrzewanie, serwowany tableside na desce dębowej", price: "298 zł" },
      { name: "Strip Loin (New York Strip) 300g", desc: "28 dni dojrzewania, intensywny smak, masło truflowe, sos chimichurri", price: "129 zł" },
      { name: "Polędwica Wołowa 400g", desc: "Podwójna porcja, idealna dla miłośników delikatności cięcia, sos au poivre", price: "239 zł" },
    ],
  },
  {
    category: "Dania z Grilla",
    subtitle: "From the Grill",
    items: [
      { name: "Łosoś Atlantycki z Grilla", desc: "Filet z łososia, masło cytrynowe, kapary, grillowane warzywa sezonowe", price: "89 zł" },
      { name: "Polędwiczki Wieprzowe", desc: "Marynowane w ziołach, grillowane, sos musztardowy z miodem, jabłko karmelizowane", price: "72 zł" },
      { name: "Kurczak Rzemieślniczy z Grilla", desc: "Cały kurczak pieczony na węglu, masło ziołowe, cytryna, tymianek", price: "78 zł" },
      { name: "Żeberka Wołowe BBQ (500g)", desc: "Duszone 8 godzin, glazurowane sosem BBQ z wędzoną papryką, finiszowane na węglu", price: "98 zł" },
      { name: "Ośmiornica z Grilla", desc: "Młoda ośmiornica grillowana na węglu, oliwa cytrynowa, grillowane ziemniaki, chimichurri", price: "96 zł", seasonal: true },
      { name: "Warzywa z Grilla Węglowego", desc: "Sezonowy zestaw warzyw z grilla — cukinia, papryka, bakłażan, asparagi, sos beurre blanc", price: "42 zł" },
    ],
  },
  {
    category: "Ryby i Owoce Morza",
    subtitle: "Fish & Seafood",
    items: [
      { name: "Dorada Pieczona w Soli", desc: "Cała ryba pieczona w skórce solnej, oliwa extra virgin, zioła prowansalskie, cytryna", price: "86 zł" },
      { name: "Krewetki King z Masłem Czosnkowym", desc: "Sautéed na patelni żeliwnej, masło czosnkowe, biały tymianek, pieczywo zakwasowe", price: "74 zł" },
      { name: "Przegrzebki z Grilla", desc: "Grillowane przegrzebki atlantyckie, puree z kalafiora, sos beurre blanc, kawiorem", price: "88 zł", seasonal: true },
    ],
  },
  {
    category: "Sałatki",
    subtitle: "Salads",
    items: [
      { name: "Sałatka Caesar z Grillowaną Polędwicą", desc: "Sałata rzymska, sos Caesar domu, parmezan, anchois, grzanki z brioche, plasterki polędwicy z grilla", price: "72 zł" },
      { name: "Sałatka z Orzechami i Serem Pleśniowym", desc: "Rukola, orzech włoski prażony, Gorgonzola, gruszka, miód truflowy, vinaigrette balsamiczne", price: "58 zł" },
      { name: "Sałatka Buraczana z Kozim Serem", desc: "Buraczki pieczone różnokolorowe, kozi ser kremowy, rukola, pestki dyni, sos miodowo-musztardowy", price: "52 zł" },
    ],
  },
  {
    category: "Dodatki",
    subtitle: "Sides",
    items: [
      { name: "Frytki Truflowe", desc: "Cienkie frytki z ziemniaków belgijskich, oliwa truflowa, parmezan, sól Maldon", price: "28 zł" },
      { name: "Asparagi z Grilla", desc: "Zielone asparagi grillowane, masło klarowane, bułka tarta, sól morska", price: "32 zł", seasonal: true },
      { name: "Ziemniaki Pieczone z Rozmarzynem", desc: "Baby potatoes pieczone w mundurkach, rozmaryn, czosnek, oliwa extra virgin", price: "24 zł" },
      { name: "Grillowane Pieczarki Portobello", desc: "Z masłem ziołowym, czosnkiem i parmezanem", price: "26 zł" },
      { name: "Puree Ziemniaczane Truflowe", desc: "Kremowe puree z masłem i oliwą truflową — klasyka w wersji luksusowej", price: "26 zł" },
      { name: "Szpinak Sautéed z Czosnkiem", desc: "Świeży szpinak podsmażany z czosnkiem i oliwą, pieprz morski", price: "22 zł" },
      { name: "Sosy (50g)", desc: "Béarnaise / Peppercorn / Chimichurri / Au Jus / Blue Cheese — do wyboru", price: "14 zł" },
    ],
  },
  {
    category: "Desery",
    subtitle: "Desserts",
    items: [
      { name: "Czekoladowe Fondant z Lodami Waniliowymi", desc: "Ciepłe fondant z belgijskiej gorzkiej czekolady, płynne wnętrze, lody waniliowe Bourbon", price: "42 zł" },
      { name: "Crème Brûlée z Wanilią Tahiti", desc: "Klasyczny krem z laski wanilii Tahiti, chrupiąca karmelizowana skorupka", price: "36 zł" },
      { name: "Tarta Tatin z Jabłkami i Karmelem", desc: "Odwrócona tarta z karmelizowanymi jabłkami, krem fraîche, lody karmelowe", price: "38 zł" },
      { name: "Tiramisu EmberCut", desc: "Własna receptura z espresso, mascarpone, biszkopty lady fingers, whisky w kakao", price: "38 zł" },
      { name: "Sorbet z Sezonowych Owoców", desc: "Trzy gałki sorbetu z owoców sezonowych — zapytaj o dzisiejszy wybór", price: "28 zł", seasonal: true },
    ],
  },
  {
    category: "Napoje",
    subtitle: "Drinks",
    items: [
      { name: "Wino Czerwone (lampka 150ml)", desc: "Sommelier-curated — zapytaj o pełną kartę win. Wybór z Francji, Włoch, Argentyny, Chile", price: "32 zł" },
      { name: "Wino Białe (lampka 150ml)", desc: "Chardonnay, Sauvignon Blanc, Riesling — zapytaj o aktualne pozycje", price: "28 zł" },
      { name: "Craft Beer Lokalny", desc: "Rzemieślnicze piwa z małopolskich browarów — zapytaj o dzisiejszy wybór", price: "22 zł" },
      { name: "EmberCut Signature Cocktail", desc: "Whisky single malt, Aperol, syrop dymny, sok z cytryny, skórka pomarańczowa", price: "38 zł" },
      { name: "Old Fashioned", desc: "Bourbon, Angostura bitters, kostka cukru, skórka pomarańczowa, lód kulkowy", price: "38 zł" },
      { name: "Single Malt Whisky (50ml)", desc: "Szeroki wybór szkockich i japońskich single maltów — zapytaj o kartę", price: "42 zł" },
      { name: "Woda Mineralna (500ml)", desc: "Gazowana lub niegazowana", price: "12 zł" },
      { name: "Espresso / Americano", desc: "Kawa z paleni specialty, Brazylia + Etiopia blend", price: "14 zł" },
    ],
  },
];

const en: MenuSection[] = [
  {
    category: "Przystawki",
    subtitle: "Starters",
    items: [
      { name: "Beef Tenderloin Tartare", desc: "Hand-chopped, egg yolk, capers, cornichons, spring onion, brioche toast", price: "58 zł" },
      { name: "Roasted Bone Marrow with Chimichurri", desc: "Roasted beef bone marrow with herb chimichurri sauce and crispy sourdough bread", price: "46 zł" },
      { name: "Beef Tenderloin Carpaccio", desc: "Thinly sliced raw tenderloin, 24-month Parmesan, rocket, truffle oil, capers", price: "52 zł" },
      { name: "Burrata with Truffle and Heritage Tomatoes", desc: "Fresh burrata, truffle oil, heritage tomatoes, basil, Maldon sea salt", price: "44 zł" },
      { name: "Smoked Dry-Aged Beef", desc: "Slices of smoked dry-aged beef, cream horseradish, sourdough bread, pickled cucumber", price: "54 zł" },
      { name: "Tiger Prawns from the Grill", desc: "Charcoal-grilled, garlic butter, lemon juice, fresh herbs, baguette", price: "64 zł" },
    ],
  },
  {
    category: "Zupy",
    subtitle: "Soups",
    items: [
      { name: "French Onion Soup with Gruyère", desc: "Classic slow-braised onion soup, crouton, baked Gruyère cheese", price: "32 zł", seasonal: true },
      { name: "Lobster Bisque", desc: "Creamy lobster soup with brandy, cream and cayenne pepper", price: "48 zł" },
      { name: "Beef Bone Broth with Noodles", desc: "Clear broth from dry-aged beef, house-made pasta, fresh parsley", price: "34 zł" },
      { name: "Soup of the Day", desc: "Ask your waiter for today's chef's suggestion — changes daily", price: "28 zł", seasonal: true },
    ],
  },
  {
    category: "Steki",
    subtitle: "Our Steaks",
    items: [
      { name: "Ribeye 350g", desc: "35-day dry-aged, charcoal grilled, herb butter, au jus sauce — choose your doneness", price: "149 zł" },
      { name: "T-Bone 500g", desc: "Tenderloin and sirloin in one cut, 28-day aged, Hawaiian black salt, rosemary", price: "189 zł" },
      { name: "Beef Tenderloin 200g", desc: "The noblest cut, médaillon, béarnaise or peppercorn sauce — your choice", price: "138 zł" },
      { name: "Tomahawk 900g (for 2)", desc: "Spectacular bone-in steak, 42-day aged, served tableside on an oak board", price: "298 zł" },
      { name: "Strip Loin (New York Strip) 300g", desc: "28 days aged, intense flavour, truffle butter, chimichurri sauce", price: "129 zł" },
      { name: "Beef Tenderloin 400g", desc: "Double portion, perfect for those who love the tenderness of the cut, au poivre sauce", price: "239 zł" },
    ],
  },
  {
    category: "Dania z Grilla",
    subtitle: "From the Grill",
    items: [
      { name: "Atlantic Salmon from the Charcoal Grill", desc: "Salmon fillet, lemon butter, capers, seasonal grilled vegetables", price: "89 zł" },
      { name: "Pork Tenderloin", desc: "Herb-marinated, grilled, honey mustard sauce, caramelised apple", price: "72 zł" },
      { name: "Artisan Grilled Chicken", desc: "Whole chicken roasted over charcoal, herb butter, lemon, thyme", price: "78 zł" },
      { name: "BBQ Beef Ribs (500g)", desc: "Slow-braised for 8 hours, glazed with smoked paprika BBQ sauce, finished on charcoal", price: "98 zł" },
      { name: "Charcoal-Grilled Octopus", desc: "Young octopus grilled over charcoal, lemon oil, grilled potatoes, chimichurri", price: "96 zł", seasonal: true },
      { name: "Charcoal-Grilled Vegetables", desc: "Seasonal vegetable selection — courgette, pepper, aubergine, asparagus, beurre blanc sauce", price: "42 zł" },
    ],
  },
  {
    category: "Ryby i Owoce Morza",
    subtitle: "Fish & Seafood",
    items: [
      { name: "Sea Bream Baked in Salt Crust", desc: "Whole fish baked in a salt crust, extra virgin olive oil, herbes de Provence, lemon", price: "86 zł" },
      { name: "King Prawns with Garlic Butter", desc: "Sautéed in a cast-iron pan, garlic butter, white thyme, sourdough bread", price: "74 zł" },
      { name: "Grilled Scallops", desc: "Grilled Atlantic scallops, cauliflower purée, beurre blanc sauce, caviar", price: "88 zł", seasonal: true },
    ],
  },
  {
    category: "Sałatki",
    subtitle: "Salads",
    items: [
      { name: "Caesar Salad with Grilled Tenderloin", desc: "Romaine lettuce, house Caesar dressing, Parmesan, anchovies, brioche croutons, sliced grilled tenderloin", price: "72 zł" },
      { name: "Walnut and Blue Cheese Salad", desc: "Rocket, toasted walnut, Gorgonzola, pear, truffle honey, balsamic vinaigrette", price: "58 zł" },
      { name: "Beetroot Salad with Goat's Cheese", desc: "Colourful roasted beetroot, creamy goat's cheese, rocket, pumpkin seeds, honey-mustard dressing", price: "52 zł" },
    ],
  },
  {
    category: "Dodatki",
    subtitle: "Sides",
    items: [
      { name: "Truffle Fries", desc: "Thin-cut Belgian potato fries, truffle oil, Parmesan, Maldon salt", price: "28 zł" },
      { name: "Grilled Asparagus", desc: "Green asparagus from the grill, clarified butter, breadcrumbs, sea salt", price: "32 zł", seasonal: true },
      { name: "Roasted Baby Potatoes with Rosemary", desc: "Baby potatoes jacket-roasted with rosemary, garlic, extra virgin olive oil", price: "24 zł" },
      { name: "Grilled Portobello Mushrooms", desc: "With herb butter, garlic and Parmesan", price: "26 zł" },
      { name: "Truffle Mashed Potatoes", desc: "Creamy mashed potatoes with butter and truffle oil — a luxury classic", price: "26 zł" },
      { name: "Sautéed Spinach with Garlic", desc: "Fresh spinach sautéed with garlic and olive oil, sea pepper", price: "22 zł" },
      { name: "Sauces (50g)", desc: "Béarnaise / Peppercorn / Chimichurri / Au Jus / Blue Cheese — choose one", price: "14 zł" },
    ],
  },
  {
    category: "Desery",
    subtitle: "Desserts",
    items: [
      { name: "Chocolate Fondant with Vanilla Ice Cream", desc: "Warm Belgian dark chocolate fondant with a molten centre, Bourbon vanilla ice cream", price: "42 zł" },
      { name: "Crème Brûlée with Tahitian Vanilla", desc: "Classic custard with Tahitian vanilla bean, crispy caramelised crust", price: "36 zł" },
      { name: "Apple Tarte Tatin with Caramel", desc: "Upside-down tart with caramelised apples, crème fraîche, caramel ice cream", price: "38 zł" },
      { name: "EmberCut Tiramisu", desc: "House recipe with espresso, mascarpone, lady fingers, whisky dusted with cocoa", price: "38 zł" },
      { name: "Seasonal Fruit Sorbet", desc: "Three scoops of seasonal fruit sorbet — ask about today's selection", price: "28 zł", seasonal: true },
    ],
  },
  {
    category: "Napoje",
    subtitle: "Drinks",
    items: [
      { name: "Red Wine (150ml glass)", desc: "Sommelier-curated — ask for the full wine list. Selections from France, Italy, Argentina, Chile", price: "32 zł" },
      { name: "White Wine (150ml glass)", desc: "Chardonnay, Sauvignon Blanc, Riesling — ask about current selections", price: "28 zł" },
      { name: "Local Craft Beer", desc: "Artisan beers from Lesser Poland breweries — ask about today's selection", price: "22 zł" },
      { name: "EmberCut Signature Cocktail", desc: "Single malt whisky, Aperol, smoky syrup, lemon juice, orange peel", price: "38 zł" },
      { name: "Old Fashioned", desc: "Bourbon, Angostura bitters, sugar cube, orange peel, sphere ice", price: "38 zł" },
      { name: "Single Malt Whisky (50ml)", desc: "Extensive selection of Scottish and Japanese single malts — ask for the list", price: "42 zł" },
      { name: "Mineral Water (500ml)", desc: "Still or sparkling", price: "12 zł" },
      { name: "Espresso / Americano", desc: "Specialty roastery coffee, Brazil + Ethiopia blend", price: "14 zł" },
    ],
  },
];

const de: MenuSection[] = [
  {
    category: "Przystawki",
    subtitle: "Vorspeisen",
    items: [
      { name: "Rinderlenden-Tatar", desc: "Handgehackt, Eigelb, Kapern, Cornichons, Frühlingszwiebeln, Brioche-Toast", price: "58 zł" },
      { name: "Geröstetes Knochenmark mit Chimichurri", desc: "Geröstetes Rinderknochenmark mit Kräuter-Chimichurri und knusprigem Sauerteigbrot", price: "46 zł" },
      { name: "Rinderlenden-Carpaccio", desc: "Dünn geschnittene rohe Lende, 24 Monate Parmesan, Rucola, Trüffelöl, Kapern", price: "52 zł" },
      { name: "Burrata mit Trüffel und Heritage-Tomaten", desc: "Frische Burrata, Trüffelöl, Heritage-Tomaten, Basilikum, Maldon-Meersalz", price: "44 zł" },
      { name: "Geräuchertes Dry-Aged Rindfleisch", desc: "Scheiben geräucherten Dry-Aged-Rindfleischs, Sahnemeerrettich, Sauerteigbrot, Salzgurke", price: "54 zł" },
      { name: "Tigergarneelen vom Grill", desc: "Auf Holzkohle gegrillt, Knoblauchbutter, Zitronensaft, frische Kräuter, Baguette", price: "64 zł" },
    ],
  },
  {
    category: "Zupy",
    subtitle: "Suppen",
    items: [
      { name: "Zwiebelsuppe mit Gruyère", desc: "Klassische langsam geschmorte Zwiebelsuppe, Crouton, überbackener Gruyère-Käse", price: "32 zł", seasonal: true },
      { name: "Hummerbisque", desc: "Cremige Hummersuppe mit Brandy, Sahne und Cayennepfeffer", price: "48 zł" },
      { name: "Rinderbrühe mit Nudeln", desc: "Klare Brühe aus Dry-Aged-Rindfleisch, hausgemachte Nudeln, frische Petersilie", price: "34 zł" },
      { name: "Tagessuppe", desc: "Fragen Sie Ihren Kellner nach dem heutigen Vorschlag des Küchenchefs — täglich wechselnd", price: "28 zł", seasonal: true },
    ],
  },
  {
    category: "Steki",
    subtitle: "Unsere Steaks",
    items: [
      { name: "Ribeye 350g", desc: "35 Tage trocken gereift, Holzkohlegrill, Kräuterbutter, Au-Jus-Sauce — Garstufe wählbar", price: "149 zł" },
      { name: "T-Bone 500g", desc: "Filet und Roastbeef in einem Cut, 28 Tage gereift, hawaiianisches schwarzes Salz, Rosmarin", price: "189 zł" },
      { name: "Rinderfilet 200g", desc: "Der edelste Cut, Médaillon, Béarnaise- oder Pfefferkorn-Sauce — nach Wahl", price: "138 zł" },
      { name: "Tomahawk 900g (für 2 Pers.)", desc: "Spektakuläres Steak am Knochen, 42 Tage gereift, am Tisch auf Eichenbrett serviert", price: "298 zł" },
      { name: "Strip Loin (New York Strip) 300g", desc: "28 Tage gereift, intensiver Geschmack, Trüffelbutter, Chimichurri-Sauce", price: "129 zł" },
      { name: "Rinderfilet 400g", desc: "Doppelte Portion, ideal für Liebhaber des zarten Cuts, Au-Poivre-Sauce", price: "239 zł" },
    ],
  },
  {
    category: "Dania z Grilla",
    subtitle: "Vom Holzkohlegrill",
    items: [
      { name: "Atlantischer Lachs vom Holzkohlegrill", desc: "Lachsfilet, Zitronenbutter, Kapern, saisonales Grillgemüse", price: "89 zł" },
      { name: "Schweinefilet", desc: "In Kräutern mariniert, gegrillt, Honig-Senf-Sauce, karamellisierter Apfel", price: "72 zł" },
      { name: "Handwerksgegrilltes Hähnchen", desc: "Ganzes Hähnchen über Holzkohle geröstete, Kräuterbutter, Zitrone, Thymian", price: "78 zł" },
      { name: "BBQ-Rinderrippen (500g)", desc: "8 Stunden langsam geschmort, mit Smoked-Paprika-BBQ-Sauce glasiert, auf Holzkohle verfeinert", price: "98 zł" },
      { name: "Holzkohle-Oktopus", desc: "Junger Oktopus auf Holzkohle gegrillt, Zitronenöl, gegrillte Kartoffeln, Chimichurri", price: "96 zł", seasonal: true },
      { name: "Holzkohle-Grillgemüse", desc: "Saisonale Gemüseauswahl — Zucchini, Paprika, Aubergine, Spargel, Beurre-Blanc-Sauce", price: "42 zł" },
    ],
  },
  {
    category: "Ryby i Owoce Morza",
    subtitle: "Fisch & Meeresfrüchte",
    items: [
      { name: "Dorade im Salzteig gebacken", desc: "Ganze Dorade im Salzmantel gebacken, Olivenöl extra vergine, Herbes de Provence, Zitrone", price: "86 zł" },
      { name: "King Prawns mit Knoblauchbutter", desc: "In gusseiserner Pfanne sautiert, Knoblauchbutter, weißer Thymian, Sauerteigbrot", price: "74 zł" },
      { name: "Gegrillte Jakobsmuscheln", desc: "Gegrillte atlantische Jakobsmuscheln, Blumenkohlpüree, Beurre-Blanc-Sauce, Kaviar", price: "88 zł", seasonal: true },
    ],
  },
  {
    category: "Sałatki",
    subtitle: "Salate",
    items: [
      { name: "Caesar-Salat mit gegrilltem Filet", desc: "Römersalat, hauseigenes Caesar-Dressing, Parmesan, Anchovis, Brioche-Croutons, gegrillte Filetscheiben", price: "72 zł" },
      { name: "Walnuss-Blauschimmelkäse-Salat", desc: "Rucola, geröstete Walnuss, Gorgonzola, Birne, Trüffelhonig, Balsamico-Vinaigrette", price: "58 zł" },
      { name: "Rote-Bete-Salat mit Ziegenkäse", desc: "Bunte geröstete Rote Bete, cremiger Ziegenkäse, Rucola, Kürbiskerne, Honig-Senf-Dressing", price: "52 zł" },
    ],
  },
  {
    category: "Dodatki",
    subtitle: "Beilagen",
    items: [
      { name: "Trüffel-Pommes frites", desc: "Dünn geschnittene Belgische Kartoffeln, Trüffelöl, Parmesan, Maldon-Salz", price: "28 zł" },
      { name: "Gegrillter Spargel", desc: "Grüner Spargel vom Grill, geklärte Butter, Semmelbrösel, Meersalz", price: "32 zł", seasonal: true },
      { name: "Geröstete Babykartoffeln mit Rosmarin", desc: "Babykartoffeln in der Schale mit Rosmarin, Knoblauch, Olivenöl extra vergine", price: "24 zł" },
      { name: "Gegrillte Portobello-Pilze", desc: "Mit Kräuterbutter, Knoblauch und Parmesan", price: "26 zł" },
      { name: "Trüffel-Kartoffelpüree", desc: "Cremiges Kartoffelpüree mit Butter und Trüffelöl — Luxusklassiker", price: "26 zł" },
      { name: "Sautierter Spinat mit Knoblauch", desc: "Frischer Spinat mit Knoblauch und Olivenöl sautiert, Meerpfeffer", price: "22 zł" },
      { name: "Saucen (50g)", desc: "Béarnaise / Pfefferkorn / Chimichurri / Au Jus / Blauschimmel — nach Wahl", price: "14 zł" },
    ],
  },
  {
    category: "Desery",
    subtitle: "Desserts",
    items: [
      { name: "Schokoladen-Fondant mit Vanilleeis", desc: "Warmes belgisches Bitterschokoladen-Fondant mit flüssigem Kern, Bourbon-Vanilleeis", price: "42 zł" },
      { name: "Crème Brûlée mit Tahiti-Vanille", desc: "Klassischer Vanillecreme mit Tahiti-Vanilleschote, knusprige karamellisierte Kruste", price: "36 zł" },
      { name: "Apfel-Tarte-Tatin mit Karamell", desc: "Umgekehrte Tarte mit karamellisierten Äpfeln, Crème fraîche, Karamelleis", price: "38 zł" },
      { name: "EmberCut Tiramisu", desc: "Hausrezept mit Espresso, Mascarpone, Löffelbiskuits, Whisky, Kakao", price: "38 zł" },
      { name: "Saisonales Fruchtsorbet", desc: "Drei Kugeln Fruchtsorbet der Saison — fragen Sie nach der heutigen Auswahl", price: "28 zł", seasonal: true },
    ],
  },
  {
    category: "Napoje",
    subtitle: "Getränke",
    items: [
      { name: "Rotwein (150ml Glas)", desc: "Vom Sommelier ausgewählt — fragen Sie nach der vollständigen Weinkarte. Auswahl aus Frankreich, Italien, Argentinien, Chile", price: "32 zł" },
      { name: "Weißwein (150ml Glas)", desc: "Chardonnay, Sauvignon Blanc, Riesling — fragen Sie nach aktuellen Positionen", price: "28 zł" },
      { name: "Lokales Craft-Bier", desc: "Handwerksbiere aus Kleinpolnischen Brauereien — fragen Sie nach der Tagesauswahl", price: "22 zł" },
      { name: "EmberCut Signature Cocktail", desc: "Single Malt Whisky, Aperol, Rauchsirup, Zitronensaft, Orangenschale", price: "38 zł" },
      { name: "Old Fashioned", desc: "Bourbon, Angostura Bitters, Zuckerwürfel, Orangenschale, Kugeleis", price: "38 zł" },
      { name: "Single Malt Whisky (50ml)", desc: "Umfangreiche Auswahl schottischer und japanischer Single Malts — fragen Sie nach der Karte", price: "42 zł" },
      { name: "Mineralwasser (500ml)", desc: "Still oder prickelnd", price: "12 zł" },
      { name: "Espresso / Americano", desc: "Specialty-Rösterei-Kaffee, Brasilien + Äthiopien Blend", price: "14 zł" },
    ],
  },
];

export const menuData = { pl, en, de };
export type { MenuSection, MenuItem };
