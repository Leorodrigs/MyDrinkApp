const fs = require("fs");

// Função de tradução usando Google Translate
async function translate(text) {
  if (!text || text.trim() === "") return "";

  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=pt&dt=t&q=${encodeURIComponent(
      text
    )}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Status: ${response.status}`);
    }

    const data = await response.json();
    const translated = data[0][0][0];

    if (!translated || translated === text) {
      console.warn(`⚠️ Não traduziu: "${text}"`);
      return text;
    }

    return translated;
  } catch (error) {
    console.error(`❌ Erro ao traduzir "${text}":`, error.message);
    return text;
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchDrinksByLetter(letter) {
  try {
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`
    );
    const data = await response.json();
    return data.drinks || [];
  } catch (error) {
    console.error(`Erro ao buscar drinks com letra ${letter}:`, error.message);
    return [];
  }
}

// ✅ NOVA FUNÇÃO OTIMIZADA - Só traduz ingredientes
async function translateIngredients(drink) {
  const ingredients = [];

  for (let i = 1; i <= 15; i++) {
    const ingredient = drink[`strIngredient${i}`];
    const measure = drink[`strMeasure${i}`];

    if (ingredient) {
      console.log(`  Traduzindo ingrediente: ${ingredient}`);
      const translatedIngredient = await translate(ingredient);
      await sleep(200);

      // Traduz a medida também
      let translatedMeasure = null;
      if (measure && measure.trim()) {
        translatedMeasure = await translate(measure.trim());
        // Substitui "tiro" por "dose" para padronizar
        if (translatedMeasure) {
          translatedMeasure = translatedMeasure.replace(/tiro/gi, "dose");
        }
        await sleep(200);
      }

      ingredients.push({
        name: ingredient,
        namePT: translatedIngredient,
        measure: measure,
        measurePT: translatedMeasure,
      });
    }
  }

  return ingredients;
}

// ✅ FUNÇÃO PRINCIPAL OTIMIZADA
async function translateAllDrinks() {
  console.log("🍹 Iniciando tradução de drinks (modo otimizado)...\n");

  const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
  let allDrinks = [];

  // 1. Buscar todos os drinks
  console.log("📥 Buscando drinks da API...");
  for (const letter of alphabet) {
    console.log(`  Buscando drinks com letra: ${letter.toUpperCase()}`);
    const drinks = await fetchDrinksByLetter(letter);
    allDrinks = [...allDrinks, ...drinks];
    await sleep(100);
  }

  console.log(`\n✅ Total de drinks encontrados: ${allDrinks.length}\n`);

  // 2. Traduzir cada drink (APENAS CAMPOS NECESSÁRIOS)
  console.log("🌍 Iniciando tradução...");
  console.log(
    "📝 Traduzindo apenas: Categoria, Ingredientes, Instruções, Copo\n"
  );

  const translatedDrinks = [];

  for (let index = 0; index < allDrinks.length; index++) {
    const drink = allDrinks[index];
    console.log(`\n[${index + 1}/${allDrinks.length}] ${drink.strDrink}`);

    try {
      // ❌ NÃO traduz o nome do drink (mantém original)

      // ✅ Traduz categoria
      console.log("  → Categoria...");
      const categoryPT = await translate(drink.strCategory || "");
      await sleep(300);

      // ✅ Traduz instruções
      console.log("  → Instruções...");
      const instructionsPT = await translate(drink.strInstructions || "");
      await sleep(500);

      // ✅ Traduz copo
      console.log("  → Copo...");
      const glassPT = await translate(drink.strGlass || "");
      await sleep(300);

      // ✅ Traduz ingredientes e medidas
      console.log("  → Ingredientes...");
      const ingredientsPT = await translateIngredients(drink);

      // Monta objeto traduzido
      const translatedDrink = {
        ...drink,
        // Mantém nome original
        strCategoryPT: categoryPT,
        strInstructionsPT: instructionsPT,
        strGlassPT: glassPT,
        ingredientsPT: ingredientsPT,
        translatedAt: new Date().toISOString(),
      };

      translatedDrinks.push(translatedDrink);

      console.log(`  ✅ Categoria: ${drink.strCategory} → ${categoryPT}`);
      console.log(`     Copo: ${drink.strGlass} → ${glassPT}`);
      console.log(`     Ingredientes: ${ingredientsPT.length} traduzidos`);

      // Salva progresso a cada 5 drinks
      if ((index + 1) % 5 === 0) {
        fs.writeFileSync(
          "data/drinks_pt_partial.json",
          JSON.stringify(translatedDrinks, null, 2)
        );
        console.log(
          `\n💾 Progresso salvo: ${index + 1}/${allDrinks.length} drinks`
        );
      }

      // Pausa maior a cada 10 drinks
      if ((index + 1) % 10 === 0) {
        console.log("\n⏸️ Pausa de 3 segundos...");
        await sleep(3000);
      }
    } catch (error) {
      console.error(`❌ Erro ao traduzir ${drink.strDrink}:`, error.message);
    }
  }

  // 3. Salvar arquivo final
  console.log("\n💾 Salvando arquivo final...");
  fs.writeFileSync(
    "data/drinks_pt.json",
    JSON.stringify(translatedDrinks, null, 2)
  );

  console.log("\n✅ Tradução concluída!");
  console.log(`📁 Arquivo salvo em: data/drinks_pt.json`);
  console.log(`📊 Total de drinks traduzidos: ${translatedDrinks.length}`);
  console.log("\n📋 Campos traduzidos:");
  console.log("   - Categoria (strCategoryPT)");
  console.log("   - Instruções (strInstructionsPT)");
  console.log("   - Copo (strGlassPT)");
  console.log("   - Ingredientes (ingredientsPT)");
  console.log("\n📋 Campos mantidos em inglês:");
  console.log("   - Nome do drink (strDrink)");
}

// Executar script
translateAllDrinks().catch((error) => {
  console.error("❌ Erro fatal:", error);
  process.exit(1);
});
