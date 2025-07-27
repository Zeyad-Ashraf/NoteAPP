# 📝 NoteAPP

NoteAPP هو تطبيق بسيط لتدوين الملاحظات، يحتوي على نظام مصادقة متكامل وإمكانية التفاعل مع الذكاء الاصطناعي لتلخيص محتوى الملاحظات.

---

## 🚀 Features

### 🔐 Authentication
- ✅ **Sign Up**: تسجيل حساب جديد.
- ✅ **Login**: تسجيل الدخول للمستخدم.
- ✅ **Refresh Token**: تجديد التوكن تلقائيًا عند الانتهاء.
- ✅ **Forget Password**: إرسال رابط لإعادة تعيين كلمة المرور.
- ✅ **Reset Password**: إعادة تعيين كلمة المرور عبر الرابط.
- ✅ **Confirm Password**: تأكيد كلمة المرور لتأكيد الهوية (مثلاً لتحديث الإيميل أو تغيير كلمة المرور).

### 🗒️ Notes Management
- ✅ **Add Note**: إضافة ملاحظة جديدة.
- ✅ **Get All Notes**: عرض جميع الملاحظات الخاصة بالمستخدم.
- ✅ **Delete Note**: حذف ملاحظة من النظام.

### 🧠 AI Integration
- ✅ **Summarize Note**: باستخدام الذكاء الاصطناعي (OpenRouter أو نموذج ذكي آخر)، يمكنك تلخيص محتوى الملاحظة تلقائيًا بضغطة زر.

---

## 🛠️ Technologies Used

- **Node.js** + **Express.js**
- **MongoDB** + **Mongoose**
- **JWT Authentication**
- **bcrypt** لتشفير كلمات المرور
- **multer** (لو فيه صور أو مرفقات لاحقًا)
- **OpenRouter API** لتلخيص الملاحظات باستخدام الذكاء الاصطناعي

---

## ⚙️ Installation & Running the Project

```bash
# 1. Clone the project
git clone https://github.com/your-username/NoteAPP.git
cd NoteAPP

# 2. Install dependencies
npm install

# 3. Create .env file and configure:
# - PORT
# - DB_URI (MongoDB connection string)
# - JWT_SECRET
# - OPENROUTER_API_KEY

# 4. Run the project
npm run start
