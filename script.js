// 🚗 1. გაფართოებული ლოკალური ბაზა
const localCarDatabase = {
  "BMW": {
    "1 Series (F20)": { battery: "80Ah AGM", key: "Smart Key 434MHz (ID49)", stage: "Stock 136HP ➔ Stage 1: 170HP (+34HP)" },
    "3 Series (F30 328i)": { battery: "90Ah AGM (CCA 900A)", key: "Smart Key 434MHz (ID49)", stage: "Stock 245HP ➔ Stage 1: 290HP (+45HP / +70Nm)" },
    "3 Series (G20 330i)": { battery: "90Ah AGM", key: "Smart Key ID49 434MHz", stage: "Stock 258HP ➔ Stage 1: 300HP (+42HP)" },
    "5 Series (E60 530i)": { battery: "100Ah Standard / AGM", key: "CAS3 Smart Key (868MHz)", stage: "Stock 258HP ➔ Stage 1: 275HP (+17HP Atmos)" },
    "5 Series (F10 535i)": { battery: "90Ah AGM", key: "Smart Key 868MHz / 434MHz", stage: "Stock 306HP ➔ Stage 1: 360HP (+54HP)" },
    "X5 (F15 35i)": { battery: "105Ah AGM", key: "Smart Key 434MHz", stage: "Stock 306HP ➔ Stage 1: 360HP (+54HP)" }
  },
  "Mercedes-Benz": {
    "C-Class (W204 C250)": { battery: "80Ah AGM (CCA 800A)", key: "FBS3 Chrome Key (315MHz/433MHz)", stage: "Stock 204HP ➔ Stage 1: 240HP (+36HP)" },
    "C-Class (W205 C300)": { battery: "80Ah AGM", key: "FBS4 Smart Key System", stage: "Stock 245HP ➔ Stage 1: 280HP (+35HP)" },
    "E-Class (W212 E350)": { battery: "95Ah AGM", key: "FBS3 Chrome Key (433MHz)", stage: "Stock 306HP ➔ Stage 1: 325HP (+19HP)" },
    "E-Class (W213 E300)": { battery: "80Ah AGM", key: "FBS4 Smart Key", stage: "Stock 245HP ➔ Stage 1: 290HP (+45HP)" },
    "S-Class (W222 S550)": { battery: "95Ah AGM", key: "FBS4 Keyless Go", stage: "Stock 455HP ➔ Stage 1: 520HP (+65HP)" }
  },
  "Toyota": {
    "Camry (XV50 2.5L)": { battery: "60Ah-65Ah Standard", key: "Smart Key Board ID: 271451-5300", stage: "Stock 178HP ➔ Stage 1: 190HP (+12HP)" },
    "Camry (XV70 2.5L 2018+)": { battery: "60Ah Standard (D23L)", key: "Smart Key Board ID: 231451-0351", stage: "Stock 203HP ➔ Stage 1: 218HP (+15HP)" },
    "Prius (ZVW30 2009-2015)": { battery: "45Ah (Auxiliary 12V)", key: "Smart Key Board ID: 271451-5290", stage: "არარეკომენდირებული (Hybrid Eco)" },
    "RAV4 (XA50 2019+)": { battery: "60Ah Standard", key: "Smart Key 433MHz", stage: "Stock 203HP ➔ Stage 1: 218HP (+15HP)" }
  },
  "Audi": {
    "A4 (B8 2.0 TFSI)": { battery: "80Ah-90Ah AGM", key: "Smart Key 868MHz / 315MHz", stage: "Stock 211HP ➔ Stage 1: 260HP (+49HP)" },
    "A4 (B9 2.0 TFSI)": { battery: "80Ah AGM", key: "Smart Key 433MHz / 868MHz", stage: "Stock 252HP ➔ Stage 1: 300HP (+48HP)" },
    "A6 (C7 3.0 TFSI)": { battery: "92Ah-105Ah AGM", key: "Smart Key 868MHz", stage: "Stock 310HP ➔ Stage 1: 400HP (+90HP Supercharged)" }
  },
  "Volkswagen": {
    "Golf (MK7 2.0 GTI)": { battery: "70Ah EFB / AGM", key: "Smart Key 434MHz (MQB)", stage: "Stock 220HP ➔ Stage 1: 300HP (+80HP)" },
    "Passat (B7 / NMS)": { battery: "72Ah Standard", key: "Smart Key 434MHz / 315MHz", stage: "Stock 170HP ➔ Stage 1: 210HP (+40HP)" }
  },
  "Ford": {
    "Fusion (2.0 EcoBoost)": { battery: "70Ah AGM (H6 size)", key: "Smart Key 902MHz / 433MHz", stage: "Stock 240HP ➔ Stage 1: 275HP (+35HP)" },
    "Mustang (5.0 GT)": { battery: "90Ah AGM", key: "Smart Key 902MHz", stage: "Stock 435HP ➔ Stage 1: 465HP (+30HP)" }
  },
  "Hyundai": {
    "Elantra (2017+)": { battery: "60Ah Standard", key: "4-Button Smart Key 433MHz", stage: "Stock 147HP ➔ Stage 1: 160HP (+13HP)" },
    "Sonata (2.0T 2015+)": { battery: "70Ah AGM", key: "Smart Key 433MHz", stage: "Stock 245HP ➔ Stage 1: 280HP (+35HP)" }
  },
  "Porsche": {
    "Cayenne (92A 3.0T)": { battery: "105Ah AGM", key: "Smart Key 434MHz / 868MHz", stage: "Stock 333HP ➔ Stage 1: 420HP (+87HP)" }
  },
  "Tesla": {
    "Model 3 / Model Y": { battery: "12V Li-Ion / AGM Low Voltage", key: "NFC Key Card / Phone Key (315MHz)", stage: "Acceleration Boost (0-100 -0.5 წმ)" }
  }
};

// -------------------------------------------------------------
// 🌐 2. დროპდაუნის ინიციალიზაცია
// -------------------------------------------------------------
window.onload = function() {
  const makeSelect = document.getElementById("makeSelect");

  for (let make in localCarDatabase) {
    let option = document.createElement("option");
    option.value = make;
    option.textContent = make;
    makeSelect.appendChild(option);
  }

  let globalOption = document.createElement("option");
  globalOption.value = "GLOBAL_API";
  globalOption.textContent = "🌐 სხვა (გლობალური ძებნა)";
  makeSelect.appendChild(globalOption);
};

// -------------------------------------------------------------
// 🔄 3. მოდელების განახლება
// -------------------------------------------------------------
async function updateModels() {
  const makeSelect = document.getElementById("makeSelect");
  const modelSelect = document.getElementById("modelSelect");
  const selectedMake = makeSelect.value;

  modelSelect.innerHTML = '<option value="">-- ჩატვირთვა... --</option>';
  modelSelect.disabled = true;

  if (!selectedMake) {
    modelSelect.innerHTML = '<option value="">-- ჯერ აირჩიე მარკა --</option>';
    return;
  }

  if (localCarDatabase[selectedMake]) {
    modelSelect.innerHTML = '<option value="">-- აირჩიე მოდელი --</option>';
    modelSelect.disabled = false;
    for (let model in localCarDatabase[selectedMake]) {
      let option = document.createElement("option");
      option.value = model;
      option.textContent = model;
      modelSelect.appendChild(option);
    }
  } 
  else if (selectedMake === "GLOBAL_API") {
    const inputMake = prompt("ჩაწერილი ავტომობილის მარკა (მაგ: Subaru, Dodge, Honda):");
    if (!inputMake) {
      modelSelect.innerHTML = '<option value="">-- აირჩიე მოდელი --</option>';
      return;
    }

    try {
      const response = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/${inputMake}?format=json`);
      const data = await response.json();

      if (data.Results && data.Results.length > 0) {
        modelSelect.innerHTML = `<option value="">-- ${inputMake.toUpperCase()}-ის მოდელები --</option>`;
        modelSelect.disabled = false;
        
        const uniqueModels = [...new Set(data.Results.map(item => item.Model_Name))];
        
        uniqueModels.forEach(modelName => {
          let option = document.createElement("option");
          option.value = modelName;
          option.textContent = modelName;
          modelSelect.appendChild(option);
        });
        
        modelSelect.dataset.customMake = inputMake;
      } else {
        alert("მოდელები ვერ მოიძებნა.");
        modelSelect.innerHTML = '<option value="">-- ვერ მოიძებნა --</option>';
      }
    } catch (error) {
      console.error("API Error:", error);
      alert("API-სთან კავშირი ვერ დამყარდა.");
    }
  }
}

// -------------------------------------------------------------
// 🔍 4. მონაცემების გამოჩენა (Smooth Fade-In)
// -------------------------------------------------------------
function searchCarData() {
  const makeSelect = document.getElementById("makeSelect");
  const modelSelect = document.getElementById("modelSelect");
  let make = makeSelect.value;
  const model = modelSelect.value;
  const resultCard = document.getElementById("resultCard");

  if (!make || !model) {
    alert("გთხოვთ აირჩიოთ მარკა და მოდელი!");
    return;
  }

  resultCard.classList.add("hidden");

  setTimeout(() => {
    if (make === "GLOBAL_API") {
      make = modelSelect.dataset.customMake || "Custom";
      document.getElementById("carTitle").textContent = `${make.toUpperCase()} ${model}`;
      document.getElementById("batteryData").textContent = "სტანდარტული / AGM (საჭიროებს ტექ. შემოწმებას)";
      document.getElementById("keyData").textContent = "Transponder / Smart Key (VIN კოდით გადამოწმება)";
      document.getElementById("stageData").textContent = "Stage 1 / 2 (ინდივიდუალური კალიბრაცია)";
    } else {
      const data = localCarDatabase[make][model];
      document.getElementById("carTitle").textContent = `${make} ${model}`;
      document.getElementById("batteryData").textContent = data.battery;
      document.getElementById("keyData").textContent = data.key;
      document.getElementById("stageData").textContent = data.stage;
    }

    resultCard.classList.remove("hidden");
  }, 100);
}

// -------------------------------------------------------------
// 🚨 5. ევაკუატორის GPS ლოკაცია
// -------------------------------------------------------------
function sendLocation() {
  const phoneNumber = "995555765555"; // ⚠️ ჩაწერე შენი ნომერი!

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const mapUrl = `https://www.google.com/maps?q=${lat},${lon}`;
        const message = encodeURIComponent(`გამარჯობა, მჭირდება ევაკუატორი! ჩემი ზუსტი GPS ლოკაციაა: ${mapUrl}`);
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
      },
      () => {
        window.open(`https://wa.me/${phoneNumber}?text=გამარჯობა,%20მჭირდება%20ევაკუატორი!`, '_blank');
      }
    );
  } else {
    alert("GPS მხარდაჭერა არ არის ბრაუზერში.");
  }
}