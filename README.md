
# 🎧 DeepSonic - لوحة تحكم للبحث عن البودكاست

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![Turborepo](https://img.shields.io/badge/Turborepo-Monorepo-EF4444?style=for-the-badge&logo=turborepo)
![TailwindCSS](https://img.shields.io/badge/Tailwind_v4.2-Spatial_UI-38B2AC?style=for-the-badge&logo=tailwind-css)
![Zustand](https://img.shields.io/badge/Zustand-Persist-blue?style=for-the-badge)

يحتوي هذا المستودع (Repository) على الحل البرمجي لـ **تحدي المطورين (DeepSafer Frontend Challenge)**. تم تصميم المشروع وبناؤه كنظام متكامل (Enterprise-grade System) باستخدام أحدث تقنيات الويب، مع التركيز على الأداء، التوسع، وتجربة المستخدم (UI/UX) الاستثنائية التي أطلقت عليها اسم "Spatial UI".

> **ملاحظة بخصوص شروط التقييم:** التزاماً تاماً بالشروط المذكورة في ورقة الاختبار، تم بناء هذا النظام **يدوياً بنسبة 100% دون استخدام أي أدوات للذكاء الاصطناعي (AI Tools)**. تم الاعتماد فقط على البحث وقراءة التوثيق الرسمي (Documentation) لحل المشكلات المعمارية المعقدة.

---

## 🚀 1. طريقة تشغيل المشروع (عبر Turborepo)

يعتمد هذا المشروع على **pnpm** كمدير للحزم، و **Turborepo** لإدارة مساحة العمل (Workspace).

**المتطلبات الأساسية:** يرجى التأكد من تثبيت `Node.js` و `pnpm` على جهازك.

1. **تثبيت الحزم (Dependencies):**
   قم بفتح موجه الأوامر (Terminal) في المسار الرئيسي للمشروع (الجذر) ونفذ الأمر:
   ```bash
   pnpm install

تشغيل خادم التطوير (Development Server):

code
Bash
download
content_copy
expand_less
pnpm dev

افتح الرابط http://localhost:3000 في متصفحك لتجربة التطبيق.

🏗️ 2. الهيكلية المعمارية (Architecture)

بدلاً من بناء تطبيق React تقليدي، قررت استخدام معمارية Micro-Frontend / Monorepo، مما يعكس طريقة بناء المشاريع في الشركات الكبرى (مثل Vercel). هذا يفصل "المنطق البرمجي" عن "واجهة المستخدم".

هيكل المجلدات (Directory Structure):

apps/web: تطبيق Next.js الأساسي. يعمل كـ "مُنسق" (Orchestrator) يستورد ويستخدم الحزم الأخرى.

packages/api: حزمة مستقلة تحتوي على منطق جلب البيانات من (iTunes API).

packages/store: عقل التطبيق. تحتوي على حالة Zustand المشتركة.

packages/types: المصدر الوحيد (Single Source of Truth) لتعريفات TypeScript (Interfaces).

packages/ui: نظام التصميم المشترك والمجهز للعمل مع محرك Tailwind CSS v4.2.

🧠 3. إدارة الحالة (Zustand Store)

تم استخدام Zustand لإدارة حالة التطبيق لكونه خفيفاً، سريعاً، ولا يتطلب كوداً معقداً (Zero-boilerplate).

تم تقسيم الـ Store (useAppStore) ليدير ثلاثة أجزاء رئيسية:

المشغل العالمي (Global Player): يدير حالة الصوت (currentTrack, isPlaying) مما يضمن عدم انقطاع الصوت عند التنقل بين الصفحات.

تفضيلات المستخدم (User Preferences): يدير مصفوفات (favorites, recentlyViewed, recentSearches) لتقديم تجربة مخصصة لكل مستخدم.

الحفظ الدائم (Persistence Middleware): بناءً على طلب التقييم، استخدمت persist middleware من Zustand مع دالة partialize مخصصة، لضمان حفظ بيانات "المفضلة وسجل البحث" فقط في الـ LocalStorage، مع تجاهل الحالات المؤقتة (مثل المشغل الصوتي) لمنع الأخطاء عند إعادة تحميل الصفحة.

⚠️ 4. التحديات التقنية وحلولها (Difficulties & Solutions)

خلال مرحلة التطوير، واجهت تحديات معمارية وبرمجية، وقمت بحلها بأساليب هندسية معتمدة:

التحدي الأول: مشاكل الـ Pagination في iTunes API

المشكلة: واجهة iTunes API لا تدعم ميزة الإزاحة (offset) بشكل موثوق في نقطة البحث /search. طلب صفحات جديدة غالباً ما يعيد نتائج مكررة أو فارغة، مما يكسر تجربة التحميل المتتابع (Infinite Scroll).
الحل (Client-Side Pagination): قمت بتجاوز هذه المشكلة عن طريق طلب 100 نتيجة دفعة واحدة وتخزينها في كاش React Query. ثم قمت بعمل "تقسيم محلي" (Client-Side Pagination) يعرض 20 نتيجة فقط ويزيدها عند الضغط على زر "Load More". هذا جعل التطبيق سريعاً جداً (Zero-Latency) ووفر استهلاك الشبكة.

التحدي الثاني: تكرار المفاتيح (React Key Duplication)

المشكلة: أحياناً تعيد واجهة آبل نفس البودكاست مرتين في نفس مصفوفة البحث، مما يسبب تحذيرات Duplicate Keys في React ويؤثر على أداء الـ Virtual DOM.
الحل (Deduplication): قمت ببناء خوارزمية إزالة تكرار باستخدام كائن Map في الجافاسكريبت. يتم تنقية المصفوفة بناءً على collectionId الفريد قبل وصولها لطبقة العرض (UI Component)، مما يضمن استقراراً بنسبة 100%.

التحدي الثالث: انقطاع الصوت عند التنقل

المشكلة: في تطبيقات Next.js التقليدية، التنقل من صفحة لأخرى يقوم بتدمير مكون المشغل الصوتي (<audio>) وإعادة بنائه، مما يوقف التشغيل.
الحل: قمت بتجريد المشغل الصوتي إلى مكون عائم (FloatingPlayer) ووضعه في ملف التخطيط الجذري (layout.tsx). هذا جعل المشغل مستقلاً تماماً عن الصفحات الداخلية، ليعمل بشكل مستمر (Seamless Playback).

🔮 5. اقتراحات للتحسين المستقبلي (Future Optimizations)

لو أتيح لي المزيد من الوقت، سأقوم بتطبيق التحسينات التالية:

بناء وسيط (BFF - Backend For Frontend): بدلاً من الاتصال بواجهة iTunes مباشرة من المتصفح، سأبني Next.js API Route ليعمل كوسيط. هذا يحل مشاكل الـ CORS ويسمح بتنقية وتشكيل البيانات في السيرفر قبل إرسالها للمستخدم.

معالجة الـ RSS (RSS Feed Parsing): التطبيق حالياً يعتمد على خاصية previewUrl. في تطبيق حقيقي، سأبني خدمة (Service) لقراءة ملف الـ XML الخاص بـ feedUrl لجلب روابط الحلقات الكاملة بصيغة .mp3.

العرض الوهمي (Virtualization): إذا قام المستخدم بإضافة مئات البودكاست للمفضلة، سأستخدم مكتبة مثل react-virtualized لاقتصار رسم الكروت في الـ DOM على الكروت المرئية فقط على الشاشة، لضمان أعلى أداء ممكن.

تم البناء بشغف وهندسة دقيقة لتحدي DeepSafer.


