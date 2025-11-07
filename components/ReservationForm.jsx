import { useState } from "react";
import {
  X,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  MapPin,
  Users,
  Plane,
  CheckCircle,
  XCircle,
} from "lucide-react";

export default function ReservationPopup({
  isOpen = true,
  onClose = () => {},
  locale = "en",
}) {
  const isRTL = locale === "ar";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const [formData, setFormData] = useState({
    guestName: "",
    age: "",
    phone: "",
    email: "",
    gender: "",
    country: "",
    numberOfCompanions: 0,
    expectedArrivalDate: "",
    expectedArrivalTime: "",
    expectedDepartureDate: "",
    purposeOfVisit: "",
    transportationMode: "",
    notes: "",
  });

  const translations = {
    en: {
      title: "Book Your Reservation",
      guestName: "Full Name",
      age: "Age",
      phone: "Phone Number",
      email: "Email (Optional)",
      gender: "Gender",
      selectGender: "Select Gender",
      male: "Male",
      female: "Female",
      country: "Country",
      numberOfCompanions: "Number of Companions",
      expectedArrivalDate: "Expected Arrival Date",
      expectedArrivalTime: "Expected Arrival Time",
      expectedDepartureDate: "Expected Departure Date (Optional)",
      purposeOfVisit: "Purpose of Visit (Optional)",
      selectPurpose: "Select Purpose",
      vacation: "Vacation",
      business: "Business",
      family: "Family Visit",
      other: "Other",
      transportationMode: "Transportation Mode (Optional)",
      selectTransportation: "Select Transportation",
      car: "Car",
      flight: "Flight",
      bus: "Bus",
      notes: "Additional Notes (Optional)",
      submit: "Submit Reservation",
      cancel: "Cancel",
      required: "This field is required",
      successTitle: "Reservation Successful!",
      successMessage:
        "Your reservation has been submitted successfully. We will contact you soon.",
      errorTitle: "Submission Failed",
      errorMessage:
        "There was an error submitting your reservation. Please try again.",
      close: "Close",
      submitting: "Submitting...",
    },
    ar: {
      title: "احجز موعدك",
      guestName: "الاسم الكامل",
      age: "العمر",
      phone: "رقم الهاتف",
      email: "البريد الإلكتروني (اختياري)",
      gender: "النوع",
      selectGender: "اختر النوع",
      male: "ذكر",
      female: "أنثى",
      country: "البلد",
      numberOfCompanions: "عدد المرافقين",
      expectedArrivalDate: "تاريخ الوصول المتوقع",
      expectedArrivalTime: "وقت الوصول المتوقع",
      expectedDepartureDate: "تاريخ المغادرة المتوقع (اختياري)",
      purposeOfVisit: "الغرض من الزيارة (اختياري)",
      selectPurpose: "اختر الغرض",
      vacation: "عطلة",
      business: "عمل",
      family: "زيارة عائلية",
      other: "أخرى",
      transportationMode: "وسيلة النقل (اختياري)",
      selectTransportation: "اختر وسيلة النقل",
      car: "سيارة",
      flight: "طائرة",
      bus: "حافلة",
      notes: "ملاحظات إضافية (اختياري)",
      submit: "إرسال الحجز",
      cancel: "إلغاء",
      required: "هذا الحقل مطلوب",
      successTitle: "تم الحجز بنجاح!",
      successMessage: "تم إرسال حجزك بنجاح. سنتواصل معك قريباً.",
      errorTitle: "فشل الإرسال",
      errorMessage: "حدث خطأ أثناء إرسال حجزك. يرجى المحاولة مرة أخرى.",
      close: "إغلاق",
      submitting: "جاري الإرسال...",
    },
  };

  const t = translations[locale] || translations.en;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Define required fields
    const requiredFields = [
      "guestName",
      "age",
      "phone",
      "country",
      "expectedArrivalDate",
      "expectedArrivalTime",
    ];

    // Find first missing field
    const firstMissingField = requiredFields.find((field) => !formData[field]);

    if (firstMissingField) {
      const fieldElement = document.querySelector(
        `[name="${firstMissingField}"]`
      );
      if (fieldElement) {
        fieldElement.focus();
        fieldElement.scrollIntoView({ behavior: "smooth", block: "center" });
        fieldElement.classList.add("border-red-500", "focus:border-red-500");

        // remove red border after a few seconds for better UX
        setTimeout(() => {
          fieldElement.classList.remove(
            "border-red-500",
            "focus:border-red-500"
          );
        }, 2500);
      }
      return; // prevent submission
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("localhost:3001/reservation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          age: parseInt(formData.age),
          numberOfCompanions: parseInt(formData.numberOfCompanions),
          expectedArrivalDate: new Date(formData.expectedArrivalDate),
        }),
      });

      console.log(response)

      if (response.ok) {
        setSubmitStatus("success");
        setTimeout(() => {
          setFormData({
            guestName: "",
            age: "",
            phone: "",
            email: "",
            gender: "",
            country: "",
            numberOfCompanions: 0,
            expectedArrivalDate: "",
            expectedArrivalTime: "",
            expectedDepartureDate: "",
            purposeOfVisit: "",
            transportationMode: "",
            notes: "",
          });
        }, 2000);
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setSubmitStatus(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-500 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        className={`relative w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden ${
          isRTL ? "rtl" : "ltr"
        }`}
        dir={isRTL ? "rtl" : "ltr"}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-600 via-amber-600 to-yellow-700 px-4 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6 flex items-center justify-between sticky top-0 z-10 shadow-lg">
          <div className="flex items-center gap-2 sm:gap-3">
            <Plane className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
              {t.title}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 sm:p-2 hover:bg-white/20 rounded-full transition-colors flex-shrink-0"
            aria-label="Close"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </button>
        </div>

        {/* Success/Error Message */}
        {submitStatus && (
          <div
            className={`mx-4 sm:mx-6 lg:mx-8 mt-4 sm:mt-6 p-4 sm:p-6 rounded-xl sm:rounded-2xl ${
              submitStatus === "success"
                ? "bg-green-50 border-2 border-green-500"
                : "bg-red-50 border-2 border-red-500"
            }`}
          >
            <div className="flex items-start sm:items-center gap-3 sm:gap-4">
              {submitStatus === "success" ? (
                <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-green-600 flex-shrink-0" />
              ) : (
                <XCircle className="w-10 h-10 sm:w-12 sm:h-12 text-red-600 flex-shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <h3
                  className={`text-lg sm:text-xl lg:text-2xl font-bold mb-1 sm:mb-2 ${
                    submitStatus === "success"
                      ? "text-green-900"
                      : "text-red-900"
                  }`}
                >
                  {submitStatus === "success" ? t.successTitle : t.errorTitle}
                </h3>
                <p
                  className={`text-sm sm:text-base lg:text-lg ${
                    submitStatus === "success"
                      ? "text-green-700"
                      : "text-red-700"
                  }`}
                >
                  {submitStatus === "success"
                    ? t.successMessage
                    : t.errorMessage}
                </p>
              </div>
            </div>
            {submitStatus === "success" && (
              <button
                onClick={handleClose}
                className="mt-3 sm:mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base transition-colors"
              >
                {t.close}
              </button>
            )}
          </div>
        )}

        {/* Form */}
        <div className="overflow-y-auto max-h-[calc(95vh-80px)] sm:max-h-[calc(90vh-100px)] lg:max-h-[calc(90vh-120px)] px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="space-y-4 sm:space-y-5 lg:space-y-6">
            {/* Row 1: Name and Age */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2 text-sm sm:text-base">
                  <User className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 flex-shrink-0" />
                  <span>
                    {t.guestName} <span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  name="guestName"
                  value={formData.guestName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-300 rounded-lg sm:rounded-xl focus:border-yellow-600 focus:ring-2 focus:ring-yellow-200 focus:outline-none transition-all text-sm sm:text-base"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                  {t.age} <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  min="1"
                  max="120"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-300 rounded-lg sm:rounded-xl focus:border-yellow-600 focus:ring-2 focus:ring-yellow-200 focus:outline-none transition-all text-sm sm:text-base"
                />
              </div>
            </div>

            {/* Row 2: Phone and Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2 text-sm sm:text-base">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 flex-shrink-0" />
                  <span>
                    {t.phone} <span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-300 rounded-lg sm:rounded-xl focus:border-yellow-600 focus:ring-2 focus:ring-yellow-200 focus:outline-none transition-all text-sm sm:text-base"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2 text-sm sm:text-base">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 flex-shrink-0" />
                  <span>{t.email}</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-300 rounded-lg sm:rounded-xl focus:border-yellow-600 focus:ring-2 focus:ring-yellow-200 focus:outline-none transition-all text-sm sm:text-base"
                />
              </div>
            </div>

            {/* Row 3: Gender and Country */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                  {t.gender}
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-300 rounded-lg sm:rounded-xl focus:border-yellow-600 focus:ring-2 focus:ring-yellow-200 focus:outline-none transition-all bg-white text-sm sm:text-base appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
                    backgroundPosition: `${
                      isRTL ? "left 0.75rem" : "right 0.75rem"
                    } center`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "1.5em 1.5em",
                    paddingRight: isRTL ? "1rem" : "2.5rem",
                    paddingLeft: isRTL ? "2.5rem" : "1rem",
                  }}
                >
                  <option value="">{t.selectGender}</option>
                  <option value="male">{t.male}</option>
                  <option value="female">{t.female}</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2 text-sm sm:text-base">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 flex-shrink-0" />
                  <span>
                    {t.country} <span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-300 rounded-lg sm:rounded-xl focus:border-yellow-600 focus:ring-2 focus:ring-yellow-200 focus:outline-none transition-all text-sm sm:text-base"
                />
              </div>
            </div>

            {/* Row 4: Number of Companions */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2 text-sm sm:text-base">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 flex-shrink-0" />
                <span>
                  {t.numberOfCompanions} <span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="number"
                name="numberOfCompanions"
                value={formData.numberOfCompanions}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-300 rounded-lg sm:rounded-xl focus:border-yellow-600 focus:ring-2 focus:ring-yellow-200 focus:outline-none transition-all text-sm sm:text-base"
              />
            </div>

            {/* Row 5: Arrival Date and Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2 text-sm sm:text-base">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 flex-shrink-0" />
                  <span>
                    {t.expectedArrivalDate}{" "}
                    <span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  type="date"
                  name="expectedArrivalDate"
                  value={formData.expectedArrivalDate}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-300 rounded-lg sm:rounded-xl focus:border-yellow-600 focus:ring-2 focus:ring-yellow-200 focus:outline-none transition-all text-sm sm:text-base"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2 text-sm sm:text-base">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 flex-shrink-0" />
                  <span>
                    {t.expectedArrivalTime}{" "}
                    <span className="text-red-500">*</span>
                  </span>
                </label>
                <input
                  type="time"
                  name="expectedArrivalTime"
                  value={formData.expectedArrivalTime}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-300 rounded-lg sm:rounded-xl focus:border-yellow-600 focus:ring-2 focus:ring-yellow-200 focus:outline-none transition-all text-sm sm:text-base"
                />
              </div>
            </div>

            {/* Row 6: Departure Date */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2 flex items-center gap-2 text-sm sm:text-base">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 flex-shrink-0" />
                <span>{t.expectedDepartureDate}</span>
              </label>
              <input
                type="date"
                name="expectedDepartureDate"
                value={formData.expectedDepartureDate}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-300 rounded-lg sm:rounded-xl focus:border-yellow-600 focus:ring-2 focus:ring-yellow-200 focus:outline-none transition-all text-sm sm:text-base"
              />
            </div>

            {/* Row 7: Purpose and Transportation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                  {t.purposeOfVisit}
                </label>
                <select
                  name="purposeOfVisit"
                  value={formData.purposeOfVisit}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-300 rounded-lg sm:rounded-xl focus:border-yellow-600 focus:ring-2 focus:ring-yellow-200 focus:outline-none transition-all bg-white text-sm sm:text-base appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
                    backgroundPosition: `${
                      isRTL ? "left 0.75rem" : "right 0.75rem"
                    } center`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "1.5em 1.5em",
                    paddingRight: isRTL ? "1rem" : "2.5rem",
                    paddingLeft: isRTL ? "2.5rem" : "1rem",
                  }}
                >
                  <option value="">{t.selectPurpose}</option>
                  <option value="Vacation">{t.vacation}</option>
                  <option value="Business">{t.business}</option>
                  <option value="Family">{t.family}</option>
                  <option value="Other">{t.other}</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                  {t.transportationMode}
                </label>
                <select
                  name="transportationMode"
                  value={formData.transportationMode}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-300 rounded-lg sm:rounded-xl focus:border-yellow-600 focus:ring-2 focus:ring-yellow-200 focus:outline-none transition-all bg-white text-sm sm:text-base appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
                    backgroundPosition: `${
                      isRTL ? "left 0.75rem" : "right 0.75rem"
                    } center`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "1.5em 1.5em",
                    paddingRight: isRTL ? "1rem" : "2.5rem",
                    paddingLeft: isRTL ? "2.5rem" : "1rem",
                  }}
                >
                  <option value="">{t.selectTransportation}</option>
                  <option value="Car">{t.car}</option>
                  <option value="Flight">{t.flight}</option>
                  <option value="Bus">{t.bus}</option>
                </select>
              </div>
            </div>

            {/* Row 8: Notes */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2 text-sm sm:text-base">
                {t.notes}
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="4"
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-300 rounded-lg sm:rounded-xl focus:border-yellow-600 focus:ring-2 focus:ring-yellow-200 focus:outline-none transition-all resize-none text-sm sm:text-base"
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="order-1 sm:order-1 flex-1 bg-gradient-to-r from-yellow-600 via-amber-600 to-yellow-700 hover:from-yellow-700 hover:via-amber-700 hover:to-yellow-800 text-white py-3 sm:py-3.5 lg:py-4 rounded-lg sm:rounded-xl font-bold text-base sm:text-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
              >
                {isSubmitting ? t.submitting : t.submit}
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="order-2 sm:order-2 sm:w-auto px-6 sm:px-8 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 sm:py-3.5 lg:py-4 rounded-lg sm:rounded-xl font-semibold text-base sm:text-lg transition-colors"
              >
                {t.cancel}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
