export type Language = 'ja' | 'en' | 'fr' | 'es' | 'zh-Hant' | 'ko' | 'it' | 'de' | 'ar' | 'he' | 'hi' | 'pt' | 'sw';

export const languages = {
  ja: '日本語',
  en: 'English',
  fr: 'Français',
  es: 'Español',
  'zh-Hant': '繁體中文',
  ko: '한국어',
  it: 'Italiano',
  de: 'Deutsch',
  ar: 'العربية',
  he: 'עברית',
  hi: 'हिन्दी',
  pt: 'Português',
  sw: 'Kiswahili'
} as const;

export const translations = {
  ja: {
    title: 'GOA',
    companyName: 'MyTH株式会社',
    subtitle: 'Garden of Angels',
    apiSettings: 'API設定',
    apiKeyLabel: 'FAL API Key',
    apiKeyPlaceholder: 'fal.ai のAPI Keyを入力してください',
    basicSettings: '基本設定',
    prompt: 'プロンプト',
    promptPlaceholder: '画像の説明を入力してください...',
    imageSize: '画像サイズ',
    advancedSettings: '詳細設定',
    inferenceSteps: '推論ステップ数',
    guidanceScale: 'ガイダンススケール',
    loraSettings: 'LoRA設定',
    loraUrl: 'LoRA URL',
    loraUrlPlaceholder: 'LoRAのURLを入力してください',
    loraScale: 'LoRAスケール',
    generationSettings: '生成設定',
    numImages: '生成数',
    generate: '画像を生成',
    generating: '生成中...',
    generatedImages: '生成された画像',
    download: '画像をダウンロード',
    waitingMessage: '設定を調整して画像を生成してください',
    loadingMessage: '画像を生成中...',
    error: 'エラーが発生しました',
    showPassword: 'パスワードを表示',
    hidePassword: 'パスワードを非表示',
    home: 'ホーム',
    myPage: 'マイページ',
    loraManagement: 'Lora管理',
    backToHome: 'ホームに戻る',
    plan: 'プラン',
    availableLoraModels: '選択可能なLoraモデル',
    currentPlan: '現在のプラン',
    choosePlan: 'プラン選択',
    selectPlan: 'プランを選択',
    freePlan: 'フリープラン',
    chooseBestPlan: 'あなたのニーズに最適なプランをお選びください',
    changePlanQuestion: 'いつでもプランを変更できますか？',
    changePlanAnswer: 'はい、いつでもプランのアップグレードまたはダウングレードが可能です。変更はすぐに反映されます。',
    currentlySelectedPlan: '現在のプラン',
    selectThisPlan: '選択する',
    setApiKeyInMyPage: 'マイページでAPIキーを設定してください',
    apiKeyNotSet: 'APIキーが設定されていません。マイページで設定してください。',
    footer: {
      copyright: '© 2025 MyTH株式会社 All Rights Reserved.',
      privacyPolicy: 'プライバシーポリシー'
    },
    meta: {
      description: 'GOA (Garden of Angels) は、fal.ai/flux-loraのための代替GUIです。検閲を無効化し、LoRAモデルを使用した画像生成を可能にします。',
      siteName: 'MyTH株式会社',
      locale: 'ja-JP'
    },
    themeToggle: 'ダークモード切り替え',
    carousel: {
      autoRotateOn: '自動回転: ON',
      autoRotateOff: '自動回転: OFF',
      loadingModels: 'モデルを読み込み中...',
      noModelsAvailable: '表示できるモデルがありません',
      useThisLora: 'このLoraを使用する'
    },
    myLora: {
      title: 'マイLora',
      create: '新規作成',
      noLorasFound: '登録されたLoraがありません',
      edit: '編集',
      delete: '削除',
      creator: '作者'
    }
  },
  en: {
    title: 'GOA',
    companyName: 'MyTH Inc.',
    subtitle: 'Garden of Angels',
    apiSettings: 'API Settings',
    apiKeyLabel: 'FAL API Key',
    apiKeyPlaceholder: 'Enter your fal.ai API Key',
    basicSettings: 'Basic Settings',
    prompt: 'Prompt',
    promptPlaceholder: 'Enter image description...',
    imageSize: 'Image Size',
    advancedSettings: 'Advanced Settings',
    inferenceSteps: 'Inference Steps',
    guidanceScale: 'Guidance Scale',
    loraSettings: 'LoRA Settings',
    loraUrl: 'LoRA URL',
    loraUrlPlaceholder: 'Enter LoRA URL',
    loraScale: 'LoRA Scale',
    generationSettings: 'Generation Settings',
    numImages: 'Number of Images',
    generate: 'Generate Images',
    generating: 'Generating...',
    generatedImages: 'Generated Images',
    download: 'Download Image',
    waitingMessage: 'Adjust settings and generate images',
    loadingMessage: 'Generating images...',
    error: 'An error occurred',
    showPassword: 'Show Password',
    hidePassword: 'Hide Password',
    home: 'Home',
    myPage: 'My Page',
    loraManagement: 'Lora Management',
    backToHome: 'Back to Home',
    plan: 'Plan',
    availableLoraModels: 'Available Lora Models',
    currentPlan: 'Current Plan',
    choosePlan: 'Choose a Plan',
    selectPlan: 'Select Plan',
    freePlan: 'Free Plan',
    chooseBestPlan: 'Choose the best plan for your needs',
    changePlanQuestion: 'Can I change my plan anytime?',
    changePlanAnswer: 'Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected immediately.',
    currentlySelectedPlan: 'Current Plan',
    selectThisPlan: 'Select',
    setApiKeyInMyPage: 'Please set your API key in My Page',
    apiKeyNotSet: 'API key is not set. Please set it in My Page.',
    footer: {
      copyright: '© 2025 MyTH Inc. All Rights Reserved.',
      privacyPolicy: 'Privacy Policy'
    },
    meta: {
      description: 'GOA (Garden of Angels) is an alternative GUI for fal.ai/flux-lora, enabling image generation with LoRA models and disabled censorship.',
      siteName: 'MyTH Inc.',
      locale: 'en-US'
    },
    themeToggle: 'Toggle dark mode',
    carousel: {
      autoRotateOn: 'Auto Rotation: ON',
      autoRotateOff: 'Auto Rotation: OFF',
      loadingModels: 'Loading models...',
      noModelsAvailable: 'No models available',
      useThisLora: 'Use This Lora'
    },
    myLora: {
      title: 'My Lora',
      create: 'Create New',
      noLorasFound: 'No Lora models found',
      edit: 'Edit',
      delete: 'Delete',
      creator: 'Creator'
    }
  },
  fr: {
    title: 'FLUX.1 Générateur d\'Images',
    companyName: 'MyTH Inc.',
    apiSettings: 'Paramètres API',
    apiKeyLabel: 'Clé API FAL',
    apiKeyPlaceholder: 'Entrez votre clé API fal.ai',
    basicSettings: 'Paramètres de Base',
    prompt: 'Prompt',
    promptPlaceholder: 'Entrez la description de l\'image...',
    imageSize: 'Taille de l\'Image',
    advancedSettings: 'Paramètres Avancés',
    inferenceSteps: 'Étapes d\'Inférence',
    guidanceScale: 'Échelle de Guidage',
    loraSettings: 'Paramètres LoRA',
    loraUrl: 'URL LoRA',
    loraUrlPlaceholder: 'Entrez l\'URL LoRA',
    loraScale: 'Échelle LoRA',
    generationSettings: 'Paramètres de Génération',
    numImages: 'Nombre d\'Images',
    generate: 'Générer des Images',
    generating: 'Génération en cours...',
    generatedImages: 'Images Générées',
    download: 'Télécharger l\'Image',
    waitingMessage: 'Ajustez les paramètres et générez des images',
    loadingMessage: 'Génération d\'images en cours...',
    error: 'Une erreur est survenue',
    showPassword: 'Afficher le Mot de Passe',
    hidePassword: 'Masquer le Mot de Passe',
    myPage: 'Mon Compte',
    loraManagement: 'Gestion Lora',
    backToHome: 'Retour à la page d\'accueil',
    plan: 'Forfait',
    availableLoraModels: 'Modèles Lora Disponibles',
    currentPlan: 'Forfait Actuel',
    choosePlan: 'Choisir un Forfait',
    selectPlan: 'Sélectionner un Forfait',
    freePlan: 'Forfait Gratuit',
    chooseBestPlan: 'Choisissez le forfait qui convient le mieux à vos besoins',
    changePlanQuestion: 'Puis-je changer de forfait à tout moment ?',
    changePlanAnswer: 'Oui, vous pouvez passer à un forfait supérieur ou inférieur à tout moment. Les modifications seront appliquées immédiatement.',
    currentlySelectedPlan: 'Forfait Actuel',
    selectThisPlan: 'Sélectionner',
    setApiKeyInMyPage: 'Veuillez définir votre clé API dans Mon Compte',
    apiKeyNotSet: 'La clé API n\'est pas définie. Veuillez la définir dans Mon Compte.',
    footer: {
      copyright: '© 2025 MyTH Inc. Tous droits réservés.',
      privacyPolicy: 'Politique de confidentialité'
    },
    meta: {
      description: 'GOA (Garden of Angels) est une interface alternative pour fal.ai/flux-lora, permettant la génération d\'images avec les modèles LoRA et la censure désactivée.',
      siteName: 'MyTH Inc.',
      locale: 'fr-FR'
    },
    themeToggle: 'Basculer le mode sombre',
    carousel: {
      autoRotateOn: 'Rotation Auto: ON',
      autoRotateOff: 'Rotation Auto: OFF',
      loadingModels: 'Chargement des modèles...',
      noModelsAvailable: 'Aucun modèle disponible',
      useThisLora: 'Utiliser Ce Lora'
    },
    myLora: {
      title: 'Mes Lora',
      create: 'Créer Nouveau',
      noLorasFound: 'Aucun modèle Lora trouvé',
      edit: 'Modifier',
      delete: 'Supprimer',
      creator: 'Créateur'
    }
  },
  es: {
    title: 'FLUX.1 Generador de Imágenes',
    companyName: 'MyTH Inc.',
    apiSettings: 'Configuración de API',
    apiKeyLabel: 'Clave API FAL',
    apiKeyPlaceholder: 'Ingrese su clave API de fal.ai',
    basicSettings: 'Configuración Básica',
    prompt: 'Prompt',
    promptPlaceholder: 'Ingrese la descripción de la imagen...',
    imageSize: 'Tamaño de Imagen',
    advancedSettings: 'Configuración Avanzada',
    inferenceSteps: 'Pasos de Inferencia',
    guidanceScale: 'Escala de Guía',
    loraSettings: 'Configuración LoRA',
    loraUrl: 'URL LoRA',
    loraUrlPlaceholder: 'Ingrese URL de LoRA',
    loraScale: 'Escala LoRA',
    generationSettings: 'Configuración de Generación',
    numImages: 'Número de Imágenes',
    generate: 'Generar Imágenes',
    generating: 'Generando...',
    generatedImages: 'Imágenes Generadas',
    download: 'Descargar Imagen',
    waitingMessage: 'Ajuste la configuración y genere imágenes',
    loadingMessage: 'Generando imágenes...',
    error: 'Ha ocurrido un error',
    showPassword: 'Mostrar Contraseña',
    hidePassword: 'Ocultar Contraseña',
    myPage: 'Mi Página',
    loraManagement: 'Gestión Lora',
    backToHome: 'Regresar a la página de inicio',
    plan: 'Plan',
    availableLoraModels: 'Modelos Lora Disponibles',
    currentPlan: 'Plan Actual',
    choosePlan: 'Elegir un Plan',
    selectPlan: 'Seleccionar Plan',
    freePlan: 'Plan Gratuito',
    chooseBestPlan: 'Elija el mejor plan para sus necesidades',
    changePlanQuestion: '¿Puedo cambiar mi plan en cualquier momento?',
    changePlanAnswer: 'Sí, puede actualizar o degradar su plan en cualquier momento. Los cambios se reflejarán inmediatamente.',
    currentlySelectedPlan: 'Plan Actual',
    selectThisPlan: 'Seleccionar',
    setApiKeyInMyPage: 'Por favor, configure su clave API en Mi Página',
    apiKeyNotSet: 'La clave API no está configurada. Por favor, configúrela en Mi Página.',
    footer: {
      copyright: '© 2025 MyTH Inc. Todos los derechos reservados.',
      privacyPolicy: 'Política de privacidad'
    },
    meta: {
      description: 'GOA (Garden of Angels) es una interfaz alternativa para fal.ai/flux-lora, que permite la generación de imágenes con modelos LoRA y censura desactivada.',
      siteName: 'MyTH Inc.',
      locale: 'es-ES'
    },
    themeToggle: 'Cambiar modo oscuro',
    carousel: {
      autoRotateOn: 'Auto Rotation: ON',
      autoRotateOff: 'Auto Rotation: OFF',
      loadingModels: 'Loading models...',
      noModelsAvailable: 'No models available',
      useThisLora: 'Use This Lora'
    },
    myLora: {
      title: 'Mi Lora',
      create: 'Create New',
      noLorasFound: 'No Lora models found',
      edit: 'Edit',
      delete: 'Delete',
      creator: 'Creator'
    }
  },
  'zh-Hant': {
    title: 'GOA',
    companyName: 'MyTH股份有限公司',
    subtitle: 'Garden of Angels',
    apiSettings: 'API 設定',
    apiKeyLabel: 'FAL API 金鑰',
    apiKeyPlaceholder: '請輸入您的 fal.ai API 金鑰',
    basicSettings: '基本設定',
    prompt: '提示詞',
    promptPlaceholder: '請輸入圖像描述...',
    imageSize: '圖像尺寸',
    advancedSettings: '進階設定',
    inferenceSteps: '推理步驟',
    guidanceScale: '指導比例',
    loraSettings: 'LoRA 設定',
    loraUrl: 'LoRA 網址',
    loraUrlPlaceholder: '請輸入 LoRA 網址',
    loraScale: 'LoRA 比例',
    generationSettings: '生成設定',
    numImages: '圖像數量',
    generate: '生成圖像',
    generating: '生成中...',
    generatedImages: '已生成的圖像',
    download: '下載圖像',
    waitingMessage: '請調整設定並生成圖像',
    loadingMessage: '正在生成圖像...',
    error: '發生錯誤',
    showPassword: '顯示密碼',
    hidePassword: '隱藏密碼',
    home: 'ホーム',
    myPage: '我的頁面',
    loraManagement: 'Lora管理',
    backToHome: 'ホームに戻る',
    plan: '方案',
    availableLoraModels: '可用的 Lora 模型',
    currentPlan: '目前方案',
    choosePlan: '選擇方案',
    selectPlan: '選擇方案',
    freePlan: '免費方案',
    chooseBestPlan: '選擇最適合您需求的方案',
    changePlanQuestion: '我可以隨時更改方案嗎？',
    changePlanAnswer: '是的，您可以隨時升級或降級您的方案。變更將立即生效。',
    currentlySelectedPlan: '目前方案',
    selectThisPlan: '選擇',
    setApiKeyInMyPage: '請在我的頁面設定 API 金鑰',
    apiKeyNotSet: 'API 金鑰尚未設定。請在我的頁面設定。',
    footer: {
      copyright: '© 2025 MyTH股份有限公司 版權所有.',
      privacyPolicy: '隱私權政策'
    },
    meta: {
      description: 'GOA (Garden of Angels) 是 fal.ai/flux-lora 的替代界面，支援使用 LoRA 模型生成圖像，並已停用審查功能。',
      siteName: 'MyTH股份有限公司',
      locale: 'zh-TW'
    },
    themeToggle: '切換深色模式',
    carousel: {
      autoRotateOn: 'Auto Rotation: ON',
      autoRotateOff: 'Auto Rotation: OFF',
      loadingModels: 'Loading models...',
      noModelsAvailable: 'No models available',
      useThisLora: 'Use This Lora'
    },
    myLora: {
      title: 'My Lora',
      create: 'Create New',
      noLorasFound: 'No Lora models found',
      edit: 'Edit',
      delete: 'Delete',
      creator: 'Creator'
    }
  },
  ko: {
    title: 'GOA',
    companyName: 'MyTH 주식회사',
    subtitle: 'Garden of Angels',
    apiSettings: 'API 설정',
    apiKeyLabel: 'FAL API 키',
    apiKeyPlaceholder: 'fal.ai API 키를 입력하세요',
    basicSettings: '기본 설정',
    prompt: '프롬프트',
    promptPlaceholder: '이미지 설명을 입력하세요...',
    imageSize: '이미지 크기',
    advancedSettings: '고급 설정',
    inferenceSteps: '추론 단계',
    guidanceScale: '가이던스 스케일',
    loraSettings: 'LoRA 설정',
    loraUrl: 'LoRA URL',
    loraUrlPlaceholder: 'LoRA URL을 입력하세요',
    loraScale: 'LoRA 스케일',
    generationSettings: '생성 설정',
    numImages: '이미지 수',
    generate: '이미지 생성',
    generating: '생성 중...',
    generatedImages: '생성된 이미지',
    download: '이미지 다운로드',
    waitingMessage: '설정을 조정하고 이미지를 생성하세요',
    loadingMessage: '이미지 생성 중...',
    error: '오류가 발생했습니다',
    showPassword: '비밀번호 표시',
    hidePassword: '비밀번호 숨기기',
    myPage: '마이페이지',
    loraManagement: 'Lora 관리',
    backToHome: '홈으로 돌아가기',
    plan: '플랜',
    availableLoraModels: '사용 가능한 Lora 모델',
    currentPlan: '현재 플랜',
    choosePlan: '플랜 선택',
    selectPlan: '플랜 선택',
    freePlan: '무료 플랜',
    chooseBestPlan: '필요에 맞는 최적의 플랜을 선택하세요',
    changePlanQuestion: '언제든지 플랜을 변경할 수 있나요?',
    changePlanAnswer: '네, 언제든지 플랜을 업그레이드하거나 다운그레이드할 수 있습니다. 변경 사항은 즉시 반영됩니다.',
    currentlySelectedPlan: '현재 플랜',
    selectThisPlan: '선택',
    setApiKeyInMyPage: '마이페이지에서 API 키를 설정해 주세요',
    apiKeyNotSet: 'API 키가 설정되지 않았습니다. 마이페이지에서 설정해 주세요.',
    footer: {
      copyright: '© 2025 MyTH 주식회사 All Rights Reserved.',
      privacyPolicy: '개인정보 처리방침'
    },
    meta: {
      description: 'GOA (Garden of Angels)는 fal.ai/flux-lora를 위한 대체 GUI로, LoRA 모델을 사용한 이미지 생성과 검열 해제를 지원합니다.',
      siteName: 'MyTH 주식회사',
      locale: 'ko-KR'
    },
    themeToggle: '다크 모드 전환',
    carousel: {
      autoRotateOn: 'Auto Rotation: ON',
      autoRotateOff: 'Auto Rotation: OFF',
      loadingModels: 'Loading models...',
      noModelsAvailable: 'No models available',
      useThisLora: 'Use This Lora'
    },
    myLora: {
      title: 'My Lora',
      create: 'Create New',
      noLorasFound: 'No Lora models found',
      edit: 'Edit',
      delete: 'Delete',
      creator: 'Creator'
    }
  },
  it: {
    title: 'GOA',
    companyName: 'MyTH Inc.',
    subtitle: 'Garden of Angels',
    apiSettings: 'Impostazioni API',
    apiKeyLabel: 'Chiave API FAL',
    apiKeyPlaceholder: 'Inserisci la tua chiave API fal.ai',
    basicSettings: 'Impostazioni Base',
    prompt: 'Prompt',
    promptPlaceholder: 'Inserisci la descrizione dell\'immagine...',
    imageSize: 'Dimensione Immagine',
    advancedSettings: 'Impostazioni Avanzate',
    inferenceSteps: 'Passi di Inferenza',
    guidanceScale: 'Scala di Guida',
    loraSettings: 'Impostazioni LoRA',
    loraUrl: 'URL LoRA',
    loraUrlPlaceholder: 'Inserisci URL LoRA',
    loraScale: 'Scala LoRA',
    generationSettings: 'Impostazioni di Generazione',
    numImages: 'Numero di Immagini',
    generate: 'Genera Immagini',
    generating: 'Generazione in corso...',
    generatedImages: 'Immagini Generate',
    download: 'Scarica Immagine',
    waitingMessage: 'Regola le impostazioni e genera le immagini',
    loadingMessage: 'Generazione immagini in corso...',
    error: 'Si è verificato un errore',
    showPassword: 'Mostra Password',
    hidePassword: 'Nascondi Password',
    home: 'Home',
    myPage: 'La Mia Pagina',
    loraManagement: 'Gestione Lora',
    backToHome: 'Torna alla Home',
    plan: 'Piano',
    availableLoraModels: 'Modelli Lora Disponibili',
    currentPlan: 'Piano Attuale',
    choosePlan: 'Scegli un Piano',
    selectPlan: 'Seleziona Piano',
    freePlan: 'Piano Gratuito',
    chooseBestPlan: 'Scegli il piano migliore per le tue esigenze',
    changePlanQuestion: 'Posso cambiare piano in qualsiasi momento?',
    changePlanAnswer: 'Sì, puoi aggiornare o declassare il tuo piano in qualsiasi momento. Le modifiche saranno applicate immediatamente.',
    currentlySelectedPlan: 'Piano Attuale',
    selectThisPlan: 'Seleziona',
    setApiKeyInMyPage: 'Imposta la tua chiave API nella Mia Pagina',
    apiKeyNotSet: 'La chiave API non è impostata. Impostala nella Mia Pagina.',
    footer: {
      copyright: '© 2025 MyTH Inc. Tutti i diritti riservati.',
      privacyPolicy: 'Informativa sulla privacy'
    },
    meta: {
      description: 'GOA (Garden of Angels) è un\'interfaccia alternativa per fal.ai/flux-lora, che consente la generazione di immagini con modelli LoRA e censura disattivata.',
      siteName: 'MyTH Inc.',
      locale: 'it-IT'
    },
    themeToggle: 'Attiva/disattiva modalità scura',
    carousel: {
      autoRotateOn: 'Auto Rotation: ON',
      autoRotateOff: 'Auto Rotation: OFF',
      loadingModels: 'Loading models...',
      noModelsAvailable: 'No models available',
      useThisLora: 'Use This Lora'
    },
    myLora: {
      title: 'My Lora',
      create: 'Create New',
      noLorasFound: 'No Lora models found',
      edit: 'Edit',
      delete: 'Delete',
      creator: 'Creator'
    }
  },
  de: {
    title: 'GOA',
    companyName: 'MyTH Inc.',
    subtitle: 'Garden of Angels',
    apiSettings: 'API-Einstellungen',
    apiKeyLabel: 'FAL API-Schlüssel',
    apiKeyPlaceholder: 'Geben Sie Ihren fal.ai API-Schlüssel ein',
    basicSettings: 'Grundeinstellungen',
    prompt: 'Prompt',
    promptPlaceholder: 'Bildbeschreibung eingeben...',
    imageSize: 'Bildgröße',
    advancedSettings: 'Erweiterte Einstellungen',
    inferenceSteps: 'Inferenzschritte',
    guidanceScale: 'Guidance-Skala',
    loraSettings: 'LoRA-Einstellungen',
    loraUrl: 'LoRA-URL',
    loraUrlPlaceholder: 'LoRA-URL eingeben',
    loraScale: 'LoRA-Skala',
    generationSettings: 'Generierungseinstellungen',
    numImages: 'Anzahl der Bilder',
    generate: 'Bilder generieren',
    generating: 'Generierung läuft...',
    generatedImages: 'Generierte Bilder',
    download: 'Bild herunterladen',
    waitingMessage: 'Einstellungen anpassen und Bilder generieren',
    loadingMessage: 'Bilder werden generiert...',
    error: 'Ein Fehler ist aufgetreten',
    showPassword: 'Passwort anzeigen',
    hidePassword: 'Passwort verbergen',
    home: 'Home',
    myPage: 'Meine Seite',
    loraManagement: 'Lora-Verwaltung',
    backToHome: 'Zurück zur Homepage',
    plan: 'Tarif',
    availableLoraModels: 'Verfügbare Lora-Modelle',
    currentPlan: 'Aktueller Tarif',
    choosePlan: 'Tarif auswählen',
    selectPlan: 'Tarif wählen',
    freePlan: 'Kostenloser Tarif',
    chooseBestPlan: 'Wählen Sie den besten Tarif für Ihre Bedürfnisse',
    changePlanQuestion: 'Kann ich meinen Tarif jederzeit ändern?',
    changePlanAnswer: 'Ja, Sie können Ihren Tarif jederzeit upgraden oder downgraden. Änderungen werden sofort wirksam.',
    currentlySelectedPlan: 'Aktueller Tarif',
    selectThisPlan: 'Auswählen',
    setApiKeyInMyPage: 'Bitte setzen Sie Ihren API-Schlüssel in Meiner Seite',
    apiKeyNotSet: 'API-Schlüssel ist nicht gesetzt. Bitte setzen Sie ihn in Meiner Seite.',
    footer: {
      copyright: '© 2025 MyTH Inc. Alle Rechte vorbehalten.',
      privacyPolicy: 'Datenschutzrichtlinie'
    },
    meta: {
      description: 'GOA (Garden of Angels) ist eine alternative Benutzeroberfläche für fal.ai/flux-lora, die die Bildgenerierung mit LoRA-Modellen und deaktivierter Zensur ermöglicht.',
      siteName: 'MyTH Inc.',
      locale: 'de-DE'
    },
    themeToggle: 'Dunkelmodus umschalten',
    carousel: {
      autoRotateOn: 'Auto Rotation: ON',
      autoRotateOff: 'Auto Rotation: OFF',
      loadingModels: 'Loading models...',
      noModelsAvailable: 'No models available',
      useThisLora: 'Use This Lora'
    },
    myLora: {
      title: 'My Lora',
      create: 'Create New',
      noLorasFound: 'No Lora models found',
      edit: 'Edit',
      delete: 'Delete',
      creator: 'Creator'
    }
  },
  ar: {
    title: 'FLUX.1 مولد الصور',
    companyName: 'MyTH Inc.',
    apiSettings: 'إعدادات API',
    apiKeyLabel: 'مفتاح FAL API',
    apiKeyPlaceholder: 'أدخل مفتاح API الخاص بـ fal.ai',
    basicSettings: 'الإعدادات الأساسية',
    prompt: 'النص التوجيهي',
    promptPlaceholder: 'أدخل وصف الصورة...',
    imageSize: 'حجم الصورة',
    advancedSettings: 'إعدادات متقدمة',
    inferenceSteps: 'خطوات الاستدلال',
    guidanceScale: 'مقياس التوجيه',
    loraSettings: 'إعدادات LoRA',
    loraUrl: 'رابط LoRA',
    loraUrlPlaceholder: 'أدخل رابط LoRA',
    loraScale: 'مقياس LoRA',
    generationSettings: 'إعدادات التوليد',
    numImages: 'عدد الصور',
    generate: 'توليد الصور',
    generating: 'جاري التوليد...',
    generatedImages: 'الصور المولدة',
    download: 'تحميل الصورة',
    waitingMessage: 'اضبط الإعدادات وقم بتوليد الصور',
    loadingMessage: 'جاري توليد الصور...',
    error: 'حدث خطأ',
    showPassword: 'إظهار كلمة المرور',
    hidePassword: 'إخفاء كلمة المرور',
    home: 'Home',
    myPage: 'موقعي',
    loraManagement: 'Lora Management',
    backToHome: 'Back to Home',
    plan: 'خطة',
    availableLoraModels: 'نماذج Lora متاحة',
    currentPlan: 'الخطة الحالية',
    choosePlan: 'اختر خطة',
    selectPlan: 'اختر خطة',
    freePlan: 'خطة مجانية',
    chooseBestPlan: 'اختر أفضل خطة لمتطلباتك',
    changePlanQuestion: 'هل يمكنني تغيير خطتي عند أي وقت؟',
    changePlanAnswer: 'نعم، يمكنك ترقية أو خفض خطتك عند أي وقت. سيتم تطبيق التغييرات فورًا.',
    currentlySelectedPlan: 'الخطة الحالية',
    selectThisPlan: 'اختر',
    setApiKeyInMyPage: 'يرجى تعيين مفتاح API لموقعي',
    apiKeyNotSet: 'مفتاح API غير معين. يرجى تعيينه في موقعي.',
    footer: {
      copyright: '© 2025 MyTH Inc. جميع الحقوق محفوظة.',
      privacyPolicy: 'سياسة الخصوصية'
    },
    meta: {
      description: 'FLUX.1 مولد الصور هو واجهة بديلة على fal.ai/flux-lora, يتيح إنشاء الصور باستخدام نماذج LoRA مع تعطيل الرقابة.',
      siteName: 'MyTH Inc.',
      locale: 'ar-SA'
    },
    themeToggle: 'تبديل الوضع المظلم',
    carousel: {
      autoRotateOn: 'Auto Rotation: ON',
      autoRotateOff: 'Auto Rotation: OFF',
      loadingModels: 'Loading models...',
      noModelsAvailable: 'No models available',
      useThisLora: 'Use This Lora'
    },
    myLora: {
      title: 'My Lora',
      create: 'Create New',
      noLorasFound: 'No Lora models found',
      edit: 'Edit',
      delete: 'Delete',
      creator: 'Creator'
    }
  },
  he: {
    title: 'FLUX.1 מחולל תמונות',
    companyName: 'MyTH Inc.',
    apiSettings: 'הגדרות API',
    apiKeyLabel: 'מפתח FAL API',
    apiKeyPlaceholder: 'הכנס את מפתח ה-API של fal.ai',
    basicSettings: 'הגדרות בסיסיות',
    prompt: 'הנחיה',
    promptPlaceholder: 'הכנס תיאור תמונה...',
    imageSize: 'גודל תמונה',
    advancedSettings: 'הגדרות מתקדמות',
    inferenceSteps: 'שלבי הסקה',
    guidanceScale: 'סולם הכוונה',
    loraSettings: 'הגדרות LoRA',
    loraUrl: 'כתובת LoRA',
    loraUrlPlaceholder: 'הכנס כתובת LoRA',
    loraScale: 'סולם LoRA',
    generationSettings: 'הגדרות יצירה',
    numImages: 'מספר תמונות',
    generate: 'צור תמונות',
    generating: 'יוצר...',
    generatedImages: 'תמונות שנוצרו',
    download: 'הורד תמונה',
    waitingMessage: 'התאם הגדרות וצור תמונות',
    loadingMessage: 'יוצר תמונות...',
    error: 'אירעה שגיאה',
    showPassword: 'הצג סיסמה',
    hidePassword: 'הסתר סיסמה',
    home: 'Home',
    myPage: 'דף האישי שלי',
    loraManagement: 'Lora Management',
    backToHome: 'Back to Home',
    plan: 'תקציב',
    availableLoraModels: 'מודלי Lora זמינים',
    currentPlan: 'תקציב נוכחי',
    choosePlan: 'בחר תקציב',
    selectPlan: 'בחר תקציב',
    freePlan: 'תקציב חינם',
    chooseBestPlan: 'בחר את התקציב הטוב ביותר למציבות שלך',
    changePlanQuestion: 'האם אני יכול לשנות את תקציב הזה בכל עת?',
    changePlanAnswer: 'כן, אתה יכול להתקדם או להתחלק לתקציב שלך בכל עת. שינויים יוחזרו מידיות.',
    currentlySelectedPlan: 'תקציב נוכחי',
    selectThisPlan: 'בחר',
    setApiKeyInMyPage: 'אנא הגדר את מפתח ה-API שלי בדף האישי שלי',
    apiKeyNotSet: 'מפתח ה-API אינו מוגדר. אנא הגדר אותו בדף האישי שלי.',
    footer: {
      copyright: '© 2025 MyTH Inc. כל הזכויות שמורות.',
      privacyPolicy: 'מדיניות פרטיות'
    },
    meta: {
      description: 'FLUX.1 מחולל תמונות הוא ממשק חלופי עבור fal.ai/flux-lora, המאפשר יצירת תמונות עם מודלי LoRA וביטול צנזורה.',
      siteName: 'MyTH Inc.',
      locale: 'he-IL'
    },
    themeToggle: 'החלף מצב כהה',
    carousel: {
      autoRotateOn: 'Auto Rotation: ON',
      autoRotateOff: 'Auto Rotation: OFF',
      loadingModels: 'Loading models...',
      noModelsAvailable: 'No models available',
      useThisLora: 'Use This Lora'
    },
    myLora: {
      title: 'My Lora',
      create: 'Create New',
      noLorasFound: 'No Lora models found',
      edit: 'Edit',
      delete: 'Delete',
      creator: 'Creator'
    }
  },
  hi: {
    title: 'FLUX.1 छवि जनरेटर',
    companyName: 'MyTH Inc.',
    apiSettings: 'API सेटिंग्स',
    apiKeyLabel: 'FAL API कुंजी',
    apiKeyPlaceholder: 'अपनी fal.ai API कुंजी दर्ज करें',
    basicSettings: 'मूल सेटिंग्स',
    prompt: 'प्रॉम्प्ट',
    promptPlaceholder: 'छवि का विवरण दर्ज करें...',
    imageSize: 'छवि का आकार',
    advancedSettings: 'उन्नत सेटिंग्स',
    inferenceSteps: 'अनुमान चरण',
    guidanceScale: 'मार्गदर्शन स्केल',
    loraSettings: 'LoRA सेटिंग्स',
    loraUrl: 'LoRA URL',
    loraUrlPlaceholder: 'LoRA URL दर्ज करें',
    loraScale: 'LoRA स्केल',
    generationSettings: 'जनरेशन सेटिंग्स',
    numImages: 'छवियों की संख्या',
    generate: 'छवियां बनाएं',
    generating: 'बना रहा है...',
    generatedImages: 'बनाई गई छवियां',
    download: 'छवि डाउनलोड करें',
    waitingMessage: 'सेटिंग्स समायोजित करें और छवियां बनाएं',
    loadingMessage: 'छवियां बन रही हैं...',
    error: 'एक त्रुटि हुई',
    showPassword: 'पासवर्ड दिखाएं',
    hidePassword: 'पासवर्ड छिपाएं',
    home: 'Home',
    myPage: 'मेरी पृष्ठ',
    loraManagement: 'Lora Management',
    backToHome: 'Back to Home',
    plan: 'योजना',
    availableLoraModels: 'उपलब्ध Lora मॉडल',
    currentPlan: 'वर्तमान योजना',
    choosePlan: 'योजना चुनें',
    selectPlan: 'योजना चुनें',
    freePlan: 'मुफ्त योजना',
    chooseBestPlan: 'अपनी आवश्यकताओं के लिए सबसे अच्छी योजना चुनें',
    changePlanQuestion: 'क्या मैं अपनी योजना कब भी बदल सकता हूं?',
    changePlanAnswer: 'हाँ, आप अपनी योजना कब भी अपग्रेड या डाउनग्रेड कर सकते हैं। परिवर्तन तुरंत लागू हो जाएंगे।',
    currentlySelectedPlan: 'वर्तमान योजना',
    selectThisPlan: 'चुनें',
    setApiKeyInMyPage: 'मेरी पृष्ठ में API कुंजी सेट करें',
    apiKeyNotSet: 'API कुंजी सेट नहीं है। मेरी पृष्ठ में इसे सेट करें।',
    footer: {
      copyright: '© 2025 MyTH Inc. सर्वाधिकार सुरक्षित.',
      privacyPolicy: 'गोपनीयता नीति'
    },
    meta: {
      description: 'FLUX.1 छवि जनरेटर fal.ai/flux-lora के लिए एक वैकल्पिक GUI है, जो LoRA मॉडल के साथ छवि निर्माण और सेंसरशिप को निष्क्रिय करने की सुविधा प्रदान करता है।',
      siteName: 'MyTH Inc.',
      locale: 'hi-IN'
    },
    themeToggle: 'डार्क मोड टॉगल करें',
    carousel: {
      autoRotateOn: 'Auto Rotation: ON',
      autoRotateOff: 'Auto Rotation: OFF',
      loadingModels: 'Loading models...',
      noModelsAvailable: 'No models available',
      useThisLora: 'Use This Lora'
    },
    myLora: {
      title: 'My Lora',
      create: 'Create New',
      noLorasFound: 'No Lora models found',
      edit: 'Edit',
      delete: 'Delete',
      creator: 'Creator'
    }
  },
  pt: {
    title: 'FLUX.1 Gerador de Imagens',
    companyName: 'MyTH Inc.',
    apiSettings: 'Configurações da API',
    apiKeyLabel: 'Chave API FAL',
    apiKeyPlaceholder: 'Digite sua chave API fal.ai',
    basicSettings: 'Configurações Básicas',
    prompt: 'Prompt',
    promptPlaceholder: 'Digite a descrição da imagem...',
    imageSize: 'Tamanho da Imagem',
    advancedSettings: 'Configurações Avançadas',
    inferenceSteps: 'Passos de Inferência',
    guidanceScale: 'Escala de Orientação',
    loraSettings: 'Configurações LoRA',
    loraUrl: 'URL LoRA',
    loraUrlPlaceholder: 'Digite a URL do LoRA',
    loraScale: 'Escala LoRA',
    generationSettings: 'Configurações de Geração',
    numImages: 'Número de Imagens',
    generate: 'Gerar Imagens',
    generating: 'Gerando...',
    generatedImages: 'Imagens Geradas',
    download: 'Baixar Imagem',
    waitingMessage: 'Ajuste as configurações e gere imagens',
    loadingMessage: 'Gerando imagens...',
    error: 'Ocorreu um erro',
    showPassword: 'Mostrar Senha',
    hidePassword: 'Ocultar Senha',
    home: 'Home',
    myPage: 'Minha Página',
    loraManagement: 'Gestión Lora',
    backToHome: 'Back to Home',
    plan: 'Plano',
    availableLoraModels: 'Modelos Lora Disponíveis',
    currentPlan: 'Plano Atual',
    choosePlan: 'Escolher um Plano',
    selectPlan: 'Selecionar Plano',
    freePlan: 'Plano Gratuito',
    chooseBestPlan: 'Escolha o melhor plano para suas necessidades',
    changePlanQuestion: 'Posso mudar meu plano a qualquer momento?',
    changePlanAnswer: 'Sim, você pode atualizar ou degradar seu plano a qualquer momento. As alterações serão aplicadas imediatamente.',
    currentlySelectedPlan: 'Plano Atual',
    selectThisPlan: 'Selecionar',
    setApiKeyInMyPage: 'Defina sua chave API na Minha Página',
    apiKeyNotSet: 'Chave API não definida. Defina na Minha Página.',
    footer: {
      copyright: '© 2025 MyTH Inc. Todos os direitos reservados.',
      privacyPolicy: 'Política de Privacidade'
    },
    meta: {
      description: 'FLUX.1 Gerador de Imagens é uma interface alternativa para fal.ai/flux-lora, permitindo a geração de imagens com modelos LoRA e censura desativada.',
      siteName: 'MyTH Inc.',
      locale: 'pt-BR'
    },
    themeToggle: 'Alternar modo escuro',
    carousel: {
      autoRotateOn: 'Auto Rotation: ON',
      autoRotateOff: 'Auto Rotation: OFF',
      loadingModels: 'Loading models...',
      noModelsAvailable: 'No models available',
      useThisLora: 'Use This Lora'
    },
    myLora: {
      title: 'My Lora',
      create: 'Create New',
      noLorasFound: 'No Lora models found',
      edit: 'Edit',
      delete: 'Delete',
      creator: 'Creator'
    }
  },
  sw: {
    title: 'FLUX.1 Kizalishaji Picha',
    companyName: 'MyTH Inc.',
    apiSettings: 'Mipangilio ya API',
    apiKeyLabel: 'Ufunguo wa API ya FAL',
    apiKeyPlaceholder: 'Ingiza ufunguo wako wa API ya fal.ai',
    basicSettings: 'Mipangilio ya Msingi',
    prompt: 'Maelekezo',
    promptPlaceholder: 'Ingiza maelezo ya picha...',
    imageSize: 'Ukubwa wa Picha',
    advancedSettings: 'Mipangilio ya Kina',
    inferenceSteps: 'Hatua za Inference',
    guidanceScale: 'Kiwango cha Mwongozo',
    loraSettings: 'Mipangilio ya LoRA',
    loraUrl: 'URL ya LoRA',
    loraUrlPlaceholder: 'Ingiza URL ya LoRA',
    loraScale: 'Kiwango cha LoRA',
    generationSettings: 'Mipangilio ya Uzalishaji',
    numImages: 'Idadi ya Picha',
    generate: 'Zalisha Picha',
    generating: 'Inazalisha...',
    generatedImages: 'Picha Zilizozalishwa',
    download: 'Pakua Picha',
    waitingMessage: 'Rekebisha mipangilio na uzalishe picha',
    loadingMessage: 'Inazalisha picha...',
    error: 'Hitilafu imetokea',
    showPassword: 'Onyesha Nenosiri',
    hidePassword: 'Ficha Nenosiri',
    home: 'Nyumbani',
    myPage: 'Nambari ya Utafutaji',
    loraManagement: 'Usimamizi wa Lora',
    backToHome: 'Back to Home',
    plan: 'Kifaa',
    availableLoraModels: 'Mawazo Lora Zilizotumiwa',
    currentPlan: 'Kifaa Kipya',
    choosePlan: 'Chagua Kifaa',
    selectPlan: 'Chagua Kifaa',
    freePlan: 'Kifaa Kikubwa',
    chooseBestPlan: 'Chagua kifaa kikubwa kwa vipendavyo vyao',
    changePlanQuestion: 'Unaweza kubadilisha kifaa yangu wote?',
    changePlanAnswer: 'Ndiyo, unaweza kupata bidhaa ya kifaa chako wakati wowote. Mabadiliko yatatatuliwa kwa haraka.',
    currentlySelectedPlan: 'Kifaa Kipya',
    selectThisPlan: 'Chagua',
    setApiKeyInMyPage: 'Tafadhali weka ufunguo wako wa API katika Kurasa Yangu',
    apiKeyNotSet: 'Ufunguo wa API haujawekwa. Tafadhali uiweke katika Kurasa Yangu.',
    footer: {
      copyright: '© 2025 MyTH Inc. Haki zote zimehifadhiwa.',
      privacyPolicy: 'Sera ya Faragha'
    },
    meta: {
      description: 'FLUX.1 Kizalishaji Picha ni kiolesura mbadala cha fal.ai/flux-lora, kinachowezesha uzalishaji wa picha kwa kutumia modeli za LoRA na udhibiti uliozimwa.',
      siteName: 'MyTH Inc.',
      locale: 'sw-KE'
    },
    themeToggle: 'Badili hali ya giza',
    carousel: {
      autoRotateOn: 'Auto Rotation: ON',
      autoRotateOff: 'Auto Rotation: OFF',
      loadingModels: 'Loading models...',
      noModelsAvailable: 'No models available',
      useThisLora: 'Use This Lora'
    },
    myLora: {
      title: 'My Lora',
      create: 'Create New',
      noLorasFound: 'No Lora models found',
      edit: 'Edit',
      delete: 'Delete',
      creator: 'Creator'
    }
  }
} as const;

export type TranslationKey = keyof typeof translations.ja;