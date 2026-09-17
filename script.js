// ==========================================
// 0. إعدادات محرك الذكاء الاصطناعي (Google Gemini)
// ==========================================


// ==========================================
// 1. الخطة الدراسية الرسمية - قسم علوم البيانات (جامعة تعز)
// ==========================================
const academicData = {
  level1: {
    name: "المستوى الأول",
    semesters: {
      term1: {
        name: "الفصل الأول",
        courses: [
          "محاسبة (أ)",
          "مبادئ إدارة",
          "عربي (101)",
          "إقتصاد جزئي",
          "رياضيات 1",
          "ثقافة إسلامية",
          "English (101)"
        ]
      },
      term2: {
        name: "الفصل الثاني",
        courses: [
          "محاسبة (ب)",
          "مبادئ تسويق",
          "عربي (102)",
          "اقتصاد كلي",
          "إحصاء",
          "مهارات حاسوب",
          "English (102)"
        ]
      }
    }
  },
  level2: {
    name: "المستوى الثاني",
    semesters: {
      term1: {
        name: "الفصل الأول",
        courses: [
          "علوم بيانات",
          "إحصاء رياضي",
          "جبر خطي",
          "بحوث عمليات",
          "اساسيات علوم البرمجة",
          "رياضيات 2",
          "احتمالات وتوزيعات"
        ]
      },
      term2: {
        name: "الفصل الثاني",
        courses: [
          "برمجة موجهه بالكائنات",
          "استدلال احصائي 1",
          "رياضة مالية",
          "تحليل ارتباط وانحدار",
          "إحصاء اكتواري",
          "هياكل بيانات"
        ]
      }
    }
  },
  level3: {
    name: "المستوى الثالث",
    semesters: {
      term1: {
        name: "الفصل الأول",
        courses: [
          "استدلال احصائي 2",
          "أساليب التنبؤ",
          "برامج إحصائية جاهزة 1",
          "تحليل وتصميم نظم معلومات",
          "تحليل وتصميم الخوارزميات",
          "معادلات تفاضلية",
          "تصميم إدارة قواعد بيانات 1"
        ]
      },
      term2: {
        name: "الفصل الثاني",
        courses: [
          "تصميم وتحليل تجارب",
          "اساسيات البحث",
          "امن ومخازن بيانات",
          "تحليل عددي",
          "نظرية العينات",
          "تصميم قواعد بيانات 2"
        ]
      }
    }
  },
  level4: {
    name: "المستوى الرابع",
    semesters: {
      term1: {
        name: "الفصل الأول",
        courses: [
          "الضبط والسيطرة الإحصائية",
          "برمجة متقدمة",
          "تحليل متعدد المتغيرات",
          "قياس اقتصادي",
          "تصميم مواقع الإنترنت"
        ]
      },
      term2: {
        name: "الفصل الثاني",
        courses: [
          "برامج إحصائية جاهزة 2",
          "برمجة اندرويد",
          "نظم استرجاع بيانات",
          "إحصاء تطبيقي",
          "بحث تخرج"
        ]
      }
    }
  }
};

// ==========================================
// 2. مكتبة محتوى المقررات (مسار الملف مضبوط ومؤكد)
// ==========================================
const courseLibrary = {
  "أساليب التنبؤ": {
    lectures: [
      {
        title: "المحاضرة 1",
        icon: "📄",
        desc: "ملف PDF",
        status: "ready",
        filePath: "FILES/test.pdf.pdf", // إذا كان يظهر في VS Code باسم test.pdf.pdf فاكتب: "FILES/test.pdf.pdf"
        fileName: "المحاضرة_1_أساليب_التنبؤ.pdf"
      },
      {
        title: "المحاضرة 2",
        icon: "📄",
        desc: "ملف PDF",
        status: "pending"
      },
      {
        title: "المحاضرة 3",
        icon: "📄",
        desc: "ملف PDF",
        status: "pending"
      },
      {
        title: "ملخص المقرر",
        icon: "📎",
        desc: "ملف تلخيص شامل",
        status: "pending"
      }
    ],
    extraCourses: [
      {
        title: "كورس أساسيات التنبؤ والسلاسل الزمنية",
        icon: "🎥",
        desc: "رابط يوتيوب",
        url: "https://youtu.be/qma5w3lstR4?si=vJmRkZj8mkjbgzR3"
      }
    ],
    exams: [
      {
        title: "نموذج اختبار سابق 1",
        icon: "📝",
        desc: "اختبار نصفي سابق",
        status: "pending"
      }
    ]
  }
};

// ==========================================
// 3. إدارة التنقل وحالة النافذة
// ==========================================
let state = {
  currentStep: 1,
  selectedLevelKey: null,
  selectedSemesterKey: null,
  selectedCourseName: null,
  previousStepForAi: 1,
  previousCategoryForAi: null
};

const modal = document.getElementById("interactiveModal");
const modalBody = document.getElementById("modalBody");
const modalCloseBtn = document.getElementById("modalCloseBtn");
const openModalBtn = document.getElementById("openLevelsModalBtn");
const navAiBtn = document.getElementById("navAiBtn");

function openModal() {
  state.currentStep = 1;
  state.selectedLevelKey = null;
  state.selectedSemesterKey = null;
  state.selectedCourseName = null;
  renderStep();
  modal.classList.add("active");
}

function closeModal() {
  modal.classList.remove("active");
}

function goBack() {
  if (state.currentStep === "ai") {
    if (state.previousStepForAi === 5) {
      handleActionChoice(state.previousCategoryForAi);
    } else if (state.previousStepForAi === 3) {
      state.currentStep = 3;
      renderStep3();
    } else {
      closeModal();
    }
    return;
  }

  if (state.currentStep === 4) {
    state.currentStep = 3;
    state.selectedCourseName = null;
  } else if (state.currentStep === 3) {
    state.currentStep = 2;
    state.selectedSemesterKey = null;
  } else if (state.currentStep === 2) {
    state.currentStep = 1;
    state.selectedLevelKey = null;
  }
  renderStep();
}

function renderStep() {
  if (state.currentStep === "ai") {
    renderAiAssistant();
    return;
  }
  if (state.currentStep === 1) renderStep1();
  if (state.currentStep === 2) renderStep2();
  if (state.currentStep === 3) renderStep3();
  if (state.currentStep === 4) renderStep4();
}

// المرحلة 1: المستوى
function renderStep1() {
  modalBody.innerHTML = `
    <div>
      <p class="sheet-step-badge">المرحلة 1 من 4</p>
      <h2 class="sheet-title">اختر مستواك الدراسي</h2>
      <p class="sheet-desc">حدد مستواك لعرض الفصول والمقررات</p>
      <div class="apple-grid-choices">
        <button onclick="selectLevel('level1')">المستوى الأول</button>
        <button onclick="selectLevel('level2')">المستوى الثاني</button>
        <button onclick="selectLevel('level3')">المستوى الثالث</button>
        <button onclick="selectLevel('level4')">المستوى الرابع</button>
      </div>
    </div>
  `;
}

window.selectLevel = function(levelKey) {
  state.selectedLevelKey = levelKey;
  state.currentStep = 2;
  renderStep();
};

// المرحلة 2: الفصل الدراسي
function renderStep2() {
  const levelInfo = academicData[state.selectedLevelKey];

  modalBody.innerHTML = `
    <div>
      <p class="sheet-step-badge">المرحلة 2 من 4</p>
      <h2 class="sheet-title">اختر الفصل الدراسي</h2>
      <p class="sheet-desc">${levelInfo.name} — حدد الفصل لعرض مقرراته المعتمدة</p>
      <div class="apple-grid-choices">
        <button onclick="selectSemester('term1')">الفصل الأول</button>
        <button onclick="selectSemester('term2')">الفصل الثاني</button>
      </div>
      <div style="margin-top: 24px;">
        <button class="apple-back-link" onclick="goBack()">&#8594; العودة للمستويات</button>
      </div>
    </div>
  `;
}

window.selectSemester = function(semesterKey) {
  state.selectedSemesterKey = semesterKey;
  state.currentStep = 3;
  renderStep();
};

// المرحلة 3: المقررات
function renderStep3() {
  const levelInfo = academicData[state.selectedLevelKey];
  const semesterInfo = levelInfo.semesters[state.selectedSemesterKey];

  let coursesHtml = "";
  semesterInfo.courses.forEach((course) => {
    coursesHtml += `
      <div class="apple-course-item" onclick="selectCourse('${course}')">
        <span>${course}</span>
        <span style="color: #86868b; font-size: 16px;">&#8592;</span>
      </div>
    `;
  });

  modalBody.innerHTML = `
    <div>
      <p class="sheet-step-badge">المرحلة 3 من 4</p>
      <h2 class="sheet-title">اختر المقرر</h2>
      <p class="sheet-desc">${levelInfo.name} • ${semesterInfo.name}</p>

      <div class="ai-companion-bar" onclick="openAiCompanion('courses')">
        <div class="ai-companion-bar-content">
          <span class="ai-companion-bar-icon">🤖</span>
          <span>اسأل الذكاء الاصطناعي عن مقررات هذا الفصل</span>
        </div>
        <span class="ai-companion-bar-arrow">&#8592;</span>
      </div>

      <div class="apple-course-list">
        ${coursesHtml}
      </div>
      <div>
        <button class="apple-back-link" onclick="goBack()">&#8594; العودة للفصول</button>
      </div>
    </div>
  `;
}

window.selectCourse = function(courseName) {
  state.selectedCourseName = courseName;
  state.currentStep = 4;
  renderStep();
};

// المرحلة 4: خيارات المقرر
function renderStep4() {
  const levelInfo = academicData[state.selectedLevelKey];
  const semesterInfo = levelInfo.semesters[state.selectedSemesterKey];

  modalBody.innerHTML = `
    <div>
      <p class="sheet-step-badge">المرحلة 4 من 4</p>
      <h2 class="sheet-title">محتويات المقرر</h2>
      <p class="sheet-desc">مقرر: <strong>${state.selectedCourseName}</strong> (${levelInfo.name} - ${semesterInfo.name})</p>
      
      <div class="apple-action-list">
        <div class="apple-action-btn" onclick="handleActionChoice('lectures')">
          <span class="apple-action-icon">📚</span>
          <div>
            <span class="apple-action-title">المحاضرات والملحقات الخاصة بالمقرر</span>
            <span class="apple-action-sub">ملفات المحاضرات والملخصات</span>
          </div>
        </div>

        <div class="apple-action-btn" onclick="handleActionChoice('extraCourses')">
          <span class="apple-action-icon">🎓</span>
          <div>
            <span class="apple-action-title">كورسات إضافية لزيادة فهم المقرر</span>
            <span class="apple-action-sub">روابط يوتيوب وشروحات مقترحة</span>
          </div>
        </div>

        <div class="apple-action-btn" onclick="handleActionChoice('exams')">
          <span class="apple-action-icon">📝</span>
          <div>
            <span class="apple-action-title">نماذج سابقة</span>
            <span class="apple-action-sub">نماذج اختبارات سابقة للمراجعة</span>
          </div>
        </div>
      </div>

      <div>
        <button class="apple-back-link" onclick="goBack()">&#8594; العودة للمقررات</button>
      </div>
    </div>
  `;
}

// دالة لمعالجة مسار الملف تلقائياً ليعمل محلياً وعلى GitHub Pages
function getValidFilePath(path) {
  if (!path) return "#";
  return path;
}

// المرحلة 5: عرض الملفات مع التحميل المباشر المؤكد
window.handleActionChoice = function(categoryKey) {
  let categoryTitle = "";
  let defaultIcon = "📄";

  if (categoryKey === "lectures") { categoryTitle = "المحاضرات والملحقات"; defaultIcon = "📄"; }
  else if (categoryKey === "extraCourses") { categoryTitle = "الكورسات الإضافية"; defaultIcon = "🎥"; }
  else if (categoryKey === "exams") { categoryTitle = "النماذج السابقة"; defaultIcon = "📝"; }

  const courseData = courseLibrary[state.selectedCourseName];
  const items = (courseData && courseData[categoryKey]) ? courseData[categoryKey] : [];

  let contentHtml = "";

  if (items.length > 0) {
    items.forEach((item) => {
      const icon = item.icon || defaultIcon;
      let actionElement = "";

      if (item.status === "ready") {
        const fileUrl = getValidFilePath(item.filePath);
        actionElement = `
          <a href="${fileUrl}" download="${item.fileName}" class="content-item-btn">
            تحميل ⬇
          </a>
        `;
      } else if (item.url) {
        actionElement = `
          <a href="${item.url}" target="_blank" class="content-item-btn">
            مشاهدة ↗
          </a>
        `;
      } else {
        actionElement = `
          <span class="badge-pending">قيد التجهيز ⏳</span>
        `;
      }

      contentHtml += `
        <div class="content-item">
          <div class="content-item-info">
            <span class="content-item-icon">${icon}</span>
            <div>
              <span class="content-item-title">${item.title}</span>
              <span class="content-item-desc">${item.desc || ""}</span>
            </div>
          </div>
          ${actionElement}
        </div>
      `;
    });
  } else {
    let emptyMsg = "جاري تجهيز محتويات هذا القسم قريباً.";
    if (categoryKey === "exams") emptyMsg = "لا تتوفر نماذج سابقة لهذا المقرر حالياً.";
    else if (categoryKey === "extraCourses") emptyMsg = "لا تتوفر كورسات إضافية لهذا المقرر حالياً.";

    contentHtml = `
      <div class="empty-content-box">
        <div style="font-size: 32px;">📁</div>
        <h4>غير متوفر حالياً</h4>
        <p>${emptyMsg}</p>
      </div>
    `;
  }

  let aiCompanionBarHtml = "";
  if (categoryKey === "lectures") {
    aiCompanionBarHtml = `
      <div class="ai-companion-bar" onclick="openAiCompanion('lectures')">
        <div class="ai-companion-bar-content">
          <span class="ai-companion-bar-icon">🤖</span>
          <span>اسأل الذكاء الاصطناعي عن مقرر (${state.selectedCourseName})</span>
        </div>
        <span class="ai-companion-bar-arrow">&#8592;</span>
      </div>
    `;
  } else if (categoryKey === "exams") {
    aiCompanionBarHtml = `
      <div class="ai-companion-bar" onclick="openAiCompanion('exams')">
        <div class="ai-companion-bar-content">
          <span class="ai-companion-bar-icon">🤖</span>
          <span>اسأل الذكاء الاصطناعي عن نماذج هذا المقرر</span>
        </div>
        <span class="ai-companion-bar-arrow">&#8592;</span>
      </div>
    `;
  }

  modalBody.innerHTML = `
    <div>
      <div style="font-size: 34px; margin-bottom: 6px;">${defaultIcon}</div>
      <h2 class="sheet-title">${categoryTitle}</h2>
      <p class="sheet-desc">مقرر: <strong>${state.selectedCourseName}</strong></p>
      
      ${aiCompanionBarHtml}

      <div class="content-item-list">
        ${contentHtml}
      </div>

      <div>
        <button class="apple-back-link" onclick="renderStep4()">&#8594; العودة لخيارات المقرر</button>
      </div>
    </div>
  `;
};

// ==========================================
// 4. ميزة البحث السريع
// ==========================================
const searchInput = document.getElementById("courseSearchInput");
const searchDropdown = document.getElementById("searchResultsDropdown");
const clearSearchBtn = document.getElementById("clearSearchBtn");

function getAllCoursesFlat() {
  const list = [];
  for (const [lvlKey, lvlVal] of Object.entries(academicData)) {
    for (const [semKey, semVal] of Object.entries(lvlVal.semesters)) {
      semVal.courses.forEach((course) => {
        list.push({
          courseName: course,
          levelKey: lvlKey,
          levelName: lvlVal.name,
          semesterKey: semKey,
          semesterName: semVal.name
        });
      });
    }
  }
  return list;
}

const allIndexedCourses = getAllCoursesFlat();

function normalizeArabic(text) {
  return text
    .replace(/[أإآ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .trim()
    .toLowerCase();
}

if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    const query = normalizeArabic(e.target.value);

    if (!query) {
      searchDropdown.classList.remove("active");
      clearSearchBtn.classList.remove("active");
      return;
    }

    clearSearchBtn.classList.add("active");

    const matches = allIndexedCourses.filter((item) =>
      normalizeArabic(item.courseName).includes(query)
    );

    if (matches.length > 0) {
      let html = "";
      matches.forEach((item) => {
        html += `
          <div class="search-result-item" onclick="openCourseDirectly('${item.levelKey}', '${item.semesterKey}', '${item.courseName}')">
            <div class="search-result-item-info">
              <span class="search-result-title">${item.courseName}</span>
              <span class="search-result-subtitle">${item.levelName} • ${item.semesterName}</span>
            </div>
            <span class="search-result-arrow">&#8592;</span>
          </div>
        `;
      });
      searchDropdown.innerHTML = html;
    } else {
      searchDropdown.innerHTML = `
        <div class="search-no-results">
          لا يوجد مقرر بهذا الاسم في الخطة الدراسية
        </div>
      `;
    }

    searchDropdown.classList.add("active");
  });

  clearSearchBtn.addEventListener("click", () => {
    searchInput.value = "";
    searchDropdown.classList.remove("active");
    clearSearchBtn.classList.remove("active");
    searchInput.focus();
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".search-wrapper")) {
      searchDropdown.classList.remove("active");
    }
  });
}

window.openCourseDirectly = function(levelKey, semesterKey, courseName) {
  searchDropdown.classList.remove("active");
  if (searchInput) searchInput.value = "";
  if (clearSearchBtn) clearSearchBtn.classList.remove("active");

  state.selectedLevelKey = levelKey;
  state.selectedSemesterKey = semesterKey;
  state.selectedCourseName = courseName;
  state.currentStep = 4;

  renderStep();
  modal.classList.add("active");
};

// ==========================================
// 5. واجهة المساعد الذكي التفاعلي
// ==========================================
window.openAiCompanion = function(sourceContext) {
  if (sourceContext === "courses") {
    state.previousStepForAi = 3;
    state.previousCategoryForAi = null;
  } else {
    state.previousStepForAi = 5;
    state.previousCategoryForAi = sourceContext;
  }
  openAiAssistant();
};

function openAiAssistant() {
  state.currentStep = "ai";
  renderStep();
  modal.classList.add("active");
}

function renderAiAssistant() {
  const returnLabel = state.selectedCourseName ? `العودة إلى (${state.selectedCourseName})` : "العودة لتصفح المقررات";

  modalBody.innerHTML = `
    <div>
      <p class="sheet-step-badge">🤖 رفيق الطالب الذكي</p>
      <h2 class="sheet-title">المساعد الأكاديمي</h2>
      <p class="sheet-desc">كلية العلوم الإدارية • جامعة تعز</p>

      <div class="ai-chat-container">
        <!-- شريط الأسئلة السريعة -->
        <div class="ai-chips-wrapper">
          <button class="ai-chip" onclick="askAi('ما هي مواد المستوى الثالث؟')">💡 مواد المستوى الثالث</button>
          <button class="ai-chip" onclick="askAi('اشرح لي مقرر أساليب التنبؤ')">📊 أساليب التنبؤ</button>
          <button class="ai-chip" onclick="askAi('ما هي متطلبات دراسة البرمجة في التخصص؟')">🐍 البرمجة وبايثون</button>
          <button class="ai-chip" onclick="askAi('ما هي مواد المستوى الأول؟')">🎯 نصيحة للمستوى الأول</button>
        </div>

        <!-- قائمة الرسائل -->
        <div class="ai-messages-list" id="aiMessagesList">
          <div class="ai-msg ai-msg-bot">
            مرحباً بك! أنا رفيقك الأكاديمي الذكي لقسم علوم البيانات. يمكنك سؤالي عن أي مقرر، خطة المواد، أو استفساراتك الدراسية وسأجيبك فوراً.
          </div>
        </div>

        <!-- صندوق الإدخال -->
        <div class="ai-input-wrapper">
          <input type="text" id="aiUserInput" placeholder="اكتب سؤالك هنا..." onkeydown="if(event.key==='Enter') sendAiMessage()">
          <button class="ai-send-btn" id="aiSendBtn" onclick="sendAiMessage()">إرسال ↗</button>
        </div>
      </div>

      <div style="margin-top: 14px;">
        <button class="apple-back-link" onclick="goBack()">&#8594; ${returnLabel}</button>
      </div>
    </div>
  `;
}

window.sendAiMessage = function() {
  const input = document.getElementById("aiUserInput");
  if (!input) return;
  const text = input.value.trim();
  if (!text) return;

  input.value = "";
  askAi(text);
};

// نظام الرد الذكي المدمج (يجيب دائماً بذكاء ودقة)
function getLocalSmartAnswer(query) {
  const normalized = normalizeArabic(query);

  if (normalized.includes("ثالث") || normalized.includes("المستوي الثالث")) {
    return `
      المستوى الثالث يركز على التطبيقات المتقدمة في التحليل وقواعد البيانات:<br>
      • <strong>الفصل الأول:</strong> استدلال احصائي 2، أساليب التنبؤ، برامج إحصائية جاهزة 1، تحليل وتصميم نظم معلومات، الخوارزميات، معادلات تفاضلية، وتصميم إدارة قواعد بيانات 1.<br>
      • <strong>الفصل الثاني:</strong> تصميم وتحليل تجارب، اساسيات البحث، امن ومخازن بيانات، تحليل عددي، نظرية العينات، وتصميم قواعد بيانات 2.
    `;
  } else if (normalized.includes("تنبو") || normalized.includes("اساليب التنبو")) {
    return `
      مقرر <strong>أساليب التنبؤ</strong> يُدرس في المستوى الثالث (الفصل الأول). يركز على تحليل السلاسل الزمنية والتنبؤ المستقبلي بالبيانات الإحصائية والاقتصادية.<br>
      ملف <strong>المحاضرة 1</strong> متوفر وجاهز للتحميل المباشر الآن في المنصة!<br>
      <button class="ai-course-link-btn" onclick="openCourseDirectly('level3', 'term1', 'أساليب التنبؤ')">
        الانتقال لمقرر أساليب التنبؤ ↗
      </button>
    `;
  } else if (normalized.includes("اول") || normalized.includes("المستوي الاول")) {
    return `
      المستوى الأول يؤسس لمهاراتك في إدارة الأعمال والرياضيات:<br>
      • <strong>الفصل الأول:</strong> محاسبة (أ)، مبادئ إدارة، عربي (101)، إقتصاد جزئي، رياضيات 1، ثقافة إسلامية، English (101).<br>
      • <strong>الفصل الثاني:</strong> محاسبة (ب)، مبادئ تسويق، عربي (102)، اقتصاد كلي، إحصاء، مهارات حاسوب، English (102).
    `;
  } else if (normalized.includes("ثاني") || normalized.includes("المستوي الثاني")) {
    return `
      المستوى الثاني هو البداية الحقيقية للبرمجة وعلوم البيانات:<br>
      • <strong>الفصل الأول:</strong> علوم بيانات، إحصاء رياضي، جبر خطي، بحوث عمليات، اساسيات علوم البرمجة، رياضيات 2، احتمالات وتوزيعات.<br>
      • <strong>الفصل الثاني:</strong> برمجة موجهه بالكائنات، استدلال احصائي 1، رياضة مالية، تحليل ارتباط وانحدار، إحصاء اكتواري، هياكل بيانات.
    `;
  } else if (normalized.includes("رابع") || normalized.includes("المستوي الرابع")) {
    return `
      المستوى الرابع هو مستوى التخصص الدقيق وبحث التخرج:<br>
      يحتوي على: الضبط والسيطرة الإحصائية، برمجة متقدمة، تحليل متعدد المتغيرات، قياس اقتصادي، تصميم مواقع الإنترنت، برامج إحصائية 2، برمجة أندرويد، نظم استرجاع بيانات، وإحصاء تطبيقي.
    `;
  } else if (normalized.includes("برمج") || normalized.includes("بايثون") || normalized.includes("python")) {
    return `
      البرمجة تبدأ في الخطة من المستوى الثاني بمقرر <strong>اساسيات علوم البرمجة</strong>، ثم <strong>برمجة موجهة بالكائنات (OOP)</strong>، ثم <strong>الخوارزميات</strong>، وأخيراً <strong>برمجة متقدمة وبرمجة أندرويد</strong> في المستوى الرابع.
    `;
  } else if (normalized.includes("قواعد بيانات") || normalized.includes("sql") || normalized.includes("بيانات")) {
    return `
      تدرس قواعد البيانات عبر مرحلتين: <strong>تصميم إدارة قواعد بيانات 1</strong> في المستوى الثالث الفصل الأول، و <strong>تصميم قواعد بيانات 2</strong> و <strong>أمن ومخازن بيانات</strong> في الفصل الثاني.
    `;
  }

  return `
    أهلاً بك! يمكنك تصفح مقررات أي مستوى عبر الضغط على «إختر مستواك الدراسي» أو البحث السريع بالاسم في الصفحة الرئيسية، وإذا أردت الاستفسار عن أي مادة في الخطة الدراسية اكتب اسمها وسأجيبك فوراً.
  `;
}

// دالة المحادثة (تتصل بـ Gemini وإذا واجهت حظر الموقع الجغرافي تجيب محلياً فوراً وبدون أي أخطاء)
window.askAi = async function(query) {
  const messagesList = document.getElementById("aiMessagesList");
  const sendBtn = document.getElementById("aiSendBtn");
  if (!messagesList) return;

  const userBubble = document.createElement("div");
  userBubble.className = "ai-msg ai-msg-user";
  userBubble.textContent = query;
  messagesList.appendChild(userBubble);
  messagesList.scrollTop = messagesList.scrollHeight;

  const loadingBubble = document.createElement("div");
  loadingBubble.className = "ai-msg ai-msg-bot";
  loadingBubble.innerHTML = "جاري التفكير والكتابة... ✍️";
  messagesList.appendChild(loadingBubble);
  messagesList.scrollTop = messagesList.scrollHeight;

  if (sendBtn) sendBtn.disabled = true;

  const systemInstruction = `
    أنت المساعد الأكاديمي الذكي لطلاب تخصص "علوم البيانات" في كلية العلوم الإدارية بجامعة تعز (اليمن).
    المنصة من تصميم وتطوير الطالب: محمد هاني محمد.
    دورك: تقديم شروحات واضحة ومبسطة، وإجابات أكاديمية دقيقة حول مقررات التخصص. أسلوبك: ودود، احترافي، ومباشر باللغة العربية الفصحى.
  `;

  let successWithGemini = false;

try {
    const response = await fetch("https://damp-pond-35f8.mgazem7.workers.dev", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: `سؤال الطالب: ${query}`,
        systemInstruction: systemInstruction
      })
    });

    if (response.ok) {
      const data = await response.json();
      if (data.text && data.text.trim()) {
        let botText = data.text;
        botText = botText.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
        botText = botText.replace(/\n/g, "<br>");
        loadingBubble.innerHTML = botText;
        successWithGemini = true;
      }
    }
  } catch (e) {
    console.error("AI Error:", e);
    successWithGemini = false;
  }if (!successWithGemini) {
    const localAnswer = getLocalSmartAnswer(query);
    loadingBubble.innerHTML = localAnswer;
  }

  if (sendBtn) sendBtn.disabled = false;
  messagesList.scrollTop = messagesList.scrollHeight;
};

// ربط الأحداث
if (openModalBtn) openModalBtn.addEventListener("click", openModal);
if (modalCloseBtn) modalCloseBtn.addEventListener("click", closeModal);
if (navAiBtn) navAiBtn.addEventListener("click", () => {
  state.previousStepForAi = 1;
  state.previousCategoryForAi = null;
  openAiAssistant();
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

window.openModal = openModal;
window.closeModal = closeModal;
window.goBack = goBack;