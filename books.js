// books.js
const allBooks = [
    {
        id: 1,
        title: "التربية البدنية الحديثة",
        author: "د. محمد أحمد",
        category: "التربية الرياضية",
        price: 75,
        originalPrice: 90,
        discount: 17,
        description: "كتاب شامل عن التربية البدنية الحديثة يغطي جميع الجوانب النظرية والعملية، مع أمثلة تطبيقية ودراسات حالة. يعتبر مرجعاً أساسياً للطلاب والمختصين في مجال التربية الرياضية.",
        weight: "800 جرام",
        type: "كتاب أكاديمي",
        serialNumber: "ISBN-978-977-123-456-1",
        year: 2022,
        pages: 350,
        language: "العربية",
        publisher: "مركز الكتاب للنشر",
        isbn: "978-977-123-456-1",
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        additionalImages: [
            "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        isNew: false,
        inStock: true,
        rating: 4.5,
        reviews: [
            {
                name: "أحمد محمود",
                date: "2023-10-15",
                rating: 5,
                comment: "كتاب رائع ومفيد جداً، ينصح به لكل مهتم بالتربية البدنية."
            },
            {
                name: "سارة علي",
                date: "2023-09-20",
                rating: 4,
                comment: "محتوى علمي ممتاز، ولكن يحتاج لبعض التحديثات في الإصدار القادم."
            }
        ],
        stock: 25
    },
    {
        id: 2,
        title: "علم النفس الرياضي",
        author: "د. خالد سليم",
        category: "العلوم الرياضية",
        price: 60,
        originalPrice: 75,
        discount: 20,
        description: "كتاب متخصص في علم النفس الرياضي يبحث في الجوانب النفسية للأداء الرياضي، التحفيز، الضغط النفسي، والعمل الجماعي. يحتوي على أحدث النظريات والتطبيقات العملية.",
        weight: "750 جرام",
        type: "كتاب علمي",
        serialNumber: "ISBN-978-977-123-456-2",
        year: 2023,
        pages: 280,
        language: "العربية",
        publisher: "مركز الكتاب للنشر",
        isbn: "978-977-123-456-2",
        image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        additionalImages: [
            "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1516684732162-798a0062be99?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        isNew: true,
        inStock: true,
        rating: 4.2,
        reviews: [
            {
                name: "محمد حسن",
                date: "2023-11-05",
                rating: 4,
                comment: "محتوى علمي قيم، مفيد للرياضيين والمدربين على حد سواء."
            }
        ],
        stock: 18
    },
    {
        id: 3,
        title: "مباديء التدريب الرياضي",
        author: "د. أحمد فاروق",
        category: "التربية الرياضية",
        price: 80,
        originalPrice: 95,
        discount: 16,
        description: "دليل شامل لمبادئ التدريب الرياضي الحديث، يغطي التخطيط، التنفيذ، والتقييم. يحتوي على برامج تدريبية عملية ونماذج تطبيقية.",
        weight: "900 جرام",
        type: "كتاب تدريبي",
        serialNumber: "ISBN-978-977-123-456-3",
        year: 2021,
        pages: 420,
        language: "العربية",
        publisher: "مركز الكتاب للنشر",
        isbn: "978-977-123-456-3",
        image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        additionalImages: [
            "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        isNew: false,
        inStock: true,
        rating: 4.7,
        reviews: [
            {
                name: "علي وليد",
                date: "2023-08-12",
                rating: 5,
                comment: "أفضل كتاب قرأته في التدريب الرياضي، أنصح به جميع المدربين."
            },
            {
                name: "نادية محمد",
                date: "2023-07-30",
                rating: 5,
                comment: "محتوى غني وشامل، دليل عملي ممتاز."
            }
        ],
        stock: 12
    },
    {
        id: 4,
        title: "المصحف الشريف برواية حفص",
        author: "مجمع الملك فهد لطباعة المصحف",
        category: "المصاحف",
        price: 120,
        originalPrice: 150,
        discount: 20,
        description: "المصحف الشريف برواية حفص عن عاصم، طباعة فاخرة بجودة عالية، مجلد تجليد فني، مع التفسير الميسر في الهوامش. مناسب للهدايا والاستخدام الشخصي.",
        weight: "1200 جرام",
        type: "مصحف",
        serialNumber: "ISBN-978-977-123-456-4",
        year: 2023,
        pages: 604,
        language: "العربية",
        publisher: "مركز الكتاب للنشر",
        isbn: "978-977-123-456-4",
        image: "https://images.unsplash.com/photo-1604594849809-dfedbc827105?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        additionalImages: [
            "https://images.unsplash.com/photo-1604594849809-dfedbc827105?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1529254479751-fbacb4c7a587?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        isNew: true,
        inStock: true,
        rating: 5.0,
        reviews: [
            {
                name: "خالد أحمد",
                date: "2023-12-01",
                rating: 5,
                comment: "طباعة ممتازة وورق فاخر، أنصح به بشدة."
            },
            {
                name: "فاطمة عمر",
                date: "2023-11-20",
                rating: 5,
                comment: "أجمل مصحف اشتريته، الجودة تتجاوز التوقعات."
            }
        ],
        stock: 30
    },
    {
        id: 5,
        title: "التشريح الوصفي للرياضيين",
        author: "د. سامي راشد",
        category: "العلوم الرياضية",
        price: 95,
        originalPrice: 110,
        discount: 14,
        description: "كتاب متخصص في تشريح جسم الإنسان مع التركيز على الجهاز العضلي الهيكلي للرياضيين. يحتوي على رسوم توضيحية مفصلة وشرح عملي.",
        weight: "850 جرام",
        type: "كتاب علمي",
        serialNumber: "ISBN-978-977-123-456-5",
        year: 2020,
        pages: 380,
        language: "العربية",
        publisher: "مركز الكتاب للنشر",
        isbn: "978-977-123-456-5",
        image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        additionalImages: [
            "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        isNew: false,
        inStock: true,
        rating: 4.3,
        reviews: [
            {
                name: "يوسف محمد",
                date: "2023-06-15",
                rating: 4,
                comment: "كتاب مفيد للطلاب والمتخصصين في العلاج الطبيعي."
            }
        ],
        stock: 8
    },
    {
        id: 6,
        title: "اللياقة البدنية والصحة",
        author: "د. نادية محمود",
        category: "التربية الرياضية",
        price: 55,
        originalPrice: 65,
        discount: 15,
        description: "دليل عملي لتحسين اللياقة البدنية والحفاظ على الصحة العامة، مع برامج تدريبية متنوعة تناسب جميع الأعمار والمستويات.",
        weight: "600 جرام",
        type: "كتاب إرشادي",
        serialNumber: "ISBN-978-977-123-456-6",
        year: 2023,
        pages: 250,
        language: "العربية",
        publisher: "مركز الكتاب للنشر",
        isbn: "978-977-123-456-6",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        additionalImages: [
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        isNew: true,
        inStock: true,
        rating: 4.0,
        reviews: [
            {
                name: "مريم خالد",
                date: "2023-10-10",
                rating: 4,
                comment: "كتاب بسيط وسهل الفهم، مناسب للمبتدئين."
            }
        ],
        stock: 22
    },
    {
        id: 7,
        title: "الإدارة الرياضية الحديثة",
        author: "د. عماد الدين حسن",
        category: "الإدارة الرياضية",
        price: 70,
        originalPrice: 85,
        discount: 18,
        description: "كتاب شامل في إدارة المؤسسات الرياضية، التخطيط الاستراتيجي، التسويق الرياضي، وإدارة الفعاليات الرياضية الكبرى.",
        weight: "700 جرام",
        type: "كتاب إداري",
        serialNumber: "ISBN-978-977-123-456-7",
        year: 2023,
        pages: 320,
        language: "العربية",
        publisher: "مركز الكتاب للنشر",
        isbn: "978-977-123-456-7",
        image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        additionalImages: [
            "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        isNew: true,
        inStock: false,
        rating: 4.1,
        reviews: [],
        stock: 0
    },
    {
        id: 8,
        title: "التغذية للرياضيين",
        author: "د. ياسمين علي",
        category: "العلوم الرياضية",
        price: 65,
        originalPrice: 80,
        discount: 19,
        description: "دليل علمي عملي في التغذية الرياضية، برامج غذائية متخصصة، المكملات الغذائية، وتخطيط الوجبات للرياضيين المحترفين.",
        weight: "680 جرام",
        type: "كتاب علمي",
        serialNumber: "ISBN-978-977-123-456-8",
        year: 2021,
        pages: 290,
        language: "العربية",
        publisher: "مركز الكتاب للنشر",
        isbn: "978-977-123-456-8",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        additionalImages: [
            "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        isNew: false,
        inStock: true,
        rating: 4.4,
        reviews: [
            {
                name: "طارق سعيد",
                date: "2023-05-18",
                rating: 5,
                comment: "مرجع ممتاز لكل رياضي يهتم بالتغذية السليمة."
            }
        ],
        stock: 15
    },
    {
        id: 9,
        title: "تاريخ الرياضة في العالم العربي",
        author: "د. حسن مرسي",
        category: "تاريخ الرياضة",
        price: 85,
        originalPrice: 100,
        discount: 15,
        description: "رحلة تاريخية شاملة لتطور الرياضة في العالم العربي، من العصور القديمة وحتى العصر الحديث، مع سير أعلام الرياضة العربية.",
        weight: "950 جرام",
        type: "كتاب تاريخي",
        serialNumber: "ISBN-978-977-123-456-9",
        year: 2023,
        pages: 450,
        language: "العربية",
        publisher: "مركز الكتاب للنشر",
        isbn: "978-977-123-456-9",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        additionalImages: [
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        isNew: true,
        inStock: true,
        rating: 4.6,
        reviews: [
            {
                name: "عبدالله فاروق",
                date: "2023-12-05",
                rating: 5,
                comment: "كتاب رائع يوثق تاريخنا الرياضي المجيد."
            }
        ],
        stock: 20
    },
    {
        id: 10,
        title: "فلسفة التربية الرياضية",
        author: "د. علي عبد الرحمن",
        category: "التربية الرياضية",
        price: 90,
        originalPrice: 105,
        discount: 14,
        description: "دراسة فلسفية متعمقة لمفهوم التربية الرياضية وأهدافها، مع تحليل النظريات الفلسفية المؤثرة في المجال الرياضي.",
        weight: "780 جرام",
        type: "كتاب فلسفي",
        serialNumber: "ISBN-978-977-123-456-10",
        year: 2020,
        pages: 360,
        language: "العربية",
        publisher: "مركز الكتاب للنشر",
        isbn: "978-977-123-456-10",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        additionalImages: [
            "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1516684732162-798a0062be99?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        isNew: false,
        inStock: true,
        rating: 4.3,
        reviews: [
            {
                name: "د. خالد إبراهيم",
                date: "2023-03-22",
                rating: 4,
                comment: "دراسة أكاديمية قيمة للمتخصصين في فلسفة التربية."
            }
        ],
        stock: 10
    },
    {
        id: 11,
        title: "الإصابات الرياضية والعلاج الطبيعي",
        author: "د. مها السيد",
        category: "العلوم الرياضية",
        price: 110,
        originalPrice: 130,
        discount: 15,
        description: "دليل شامل للإصابات الرياضية الشائعة، التشخيص، الوقاية، وبرامج العلاج الطبيعي والتأهيل الرياضي.",
        weight: "920 جرام",
        type: "كتاب طبي",
        serialNumber: "ISBN-978-977-123-456-11",
        year: 2023,
        pages: 480,
        language: "العربية",
        publisher: "مركز الكتاب للنشر",
        isbn: "978-977-123-456-11",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        additionalImages: [
            "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1516684732162-798a0062be99?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        isNew: true,
        inStock: true,
        rating: 4.8,
        reviews: [
            {
                name: "محمد حسين",
                date: "2023-11-30",
                rating: 5,
                comment: "كتاب لا غنى عنه لأطباء الرياضة والمعالجين الطبيعيين."
            }
        ],
        stock: 14
    },
    {
        id: 12,
        title: "مناهج البحث في التربية الرياضية",
        author: "د. وليد جابر",
        category: "البحث العلمي",
        price: 75,
        originalPrice: 90,
        discount: 17,
        description: "مرجع أكاديمي شامل لمناهج البحث العلمي في التربية الرياضية، تصميم الدراسات، التحليل الإحصائي، ونشر النتائج.",
        weight: "800 جرام",
        type: "كتاب أكاديمي",
        serialNumber: "ISBN-978-977-123-456-12",
        year: 2021,
        pages: 400,
        language: "العربية",
        publisher: "مركز الكتاب للنشر",
        isbn: "978-977-123-456-12",
        image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        additionalImages: [
            "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        isNew: false,
        inStock: true,
        rating: 4.0,
        reviews: [
            {
                name: "د. أحمد سمير",
                date: "2023-04-15",
                rating: 4,
                comment: "دليل عملي مفيد لطلاب الدراسات العليا والباحثين."
            }
        ],
        stock: 17
    }
];