import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Mail, 
  Calendar, 
  IdCard, 
  Building, 
  Shield, 
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff
} from 'lucide-react';

interface UserRegistrationProps {
  onUserRegistered: (userData: UserData) => void;
  onClose: () => void;
}

interface UserData {
  id: string;
  name: string;
  email: string;
  birthday: string;
  idNumber?: string;
  companyId?: string;
  companyBirthday?: string;
  userType: 'individual' | 'company';
  verificationStatus: 'pending' | 'verified' | 'rejected';
  registrationDate: Date;
}

export const UserRegistration: React.FC<UserRegistrationProps> = ({
  onUserRegistered,
  onClose
}) => {
  const [activeStep, setActiveStep] = useState(1);
  const [userType, setUserType] = useState<'individual' | 'company'>('individual');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    birthday: '',
    idNumber: '',
    companyId: '',
    companyBirthday: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.name.trim()) {
        newErrors.name = 'Name is required';
      }
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
      }
    }

    if (step === 2) {
      if (userType === 'individual') {
        if (!formData.birthday) {
          newErrors.birthday = 'Birthday is required';
        }
        if (!formData.idNumber.trim()) {
          newErrors.idNumber = 'ID Number is required';
        }
      } else {
        if (!formData.companyId.trim()) {
          newErrors.companyId = 'Company ID is required';
        }
        if (!formData.companyBirthday) {
          newErrors.companyBirthday = 'Company founding date is required';
        }
      }
    }

    if (step === 3) {
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep(prev => Math.min(prev + 1, 3));
    }
  };

  const handleBack = () => {
    setActiveStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    const userData: UserData = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      birthday: formData.birthday,
      idNumber: userType === 'individual' ? formData.idNumber : undefined,
      companyId: userType === 'company' ? formData.companyId : undefined,
      companyBirthday: userType === 'company' ? formData.companyBirthday : undefined,
      userType,
      verificationStatus: 'pending',
      registrationDate: new Date()
    };

    onUserRegistered(userData);
    setIsSubmitting(false);
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-blue/10 backdrop-blur-md rounded-2xl p-8 max-w-2xl w-full border border-blue/20"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-blue-200 font-space">User Registration</h2>
              <p className="text-blue-300">Step {activeStep} of 3</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-blue-300 hover:text-blue-200 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`flex items-center space-x-2 ${
                  step <= activeStep ? 'text-blue-200' : 'text-blue-400'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step < activeStep ? 'bg-green-500' :
                  step === activeStep ? 'bg-blue-500' : 'bg-blue/20'
                }`}>
                  {step < activeStep ? <CheckCircle className="w-5 h-5" /> : step}
                </div>
                <span className="text-sm">
                  {step === 1 ? 'Basic Info' : step === 2 ? 'Verification' : 'Security'}
                </span>
              </div>
            ))}
          </div>
          <div className="w-full bg-blue/20 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-600 h-2 rounded-full transition-all"
              style={{ width: `${(activeStep / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Step 1: Basic Information */}
        {activeStep === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-blue-300 text-sm mb-2">Full Name *</label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-blue-400" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateFormData('name', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-blue/10 border border-blue/20 rounded-lg text-blue-200 placeholder-blue-400 focus:border-blue-400 focus:outline-none"
                  placeholder="Enter your full name"
                />
              </div>
              {errors.name && (
                <p className="text-red-400 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label className="block text-blue-300 text-sm mb-2">Email Address *</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-blue-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-blue/10 border border-blue/20 rounded-lg text-blue-200 placeholder-blue-400 focus:border-blue-400 focus:outline-none"
                  placeholder="Enter your email address"
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label className="block text-blue-300 text-sm mb-2">Account Type</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setUserType('individual')}
                  className={`p-4 rounded-lg border transition-all ${
                    userType === 'individual'
                      ? 'border-blue-400 bg-blue/20 text-blue-200'
                      : 'border-blue/20 bg-blue/10 text-blue-300 hover:bg-blue/15'
                  }`}
                >
                  <User className="w-6 h-6 mx-auto mb-2" />
                  <div className="text-sm font-medium">Individual</div>
                </button>
                <button
                  type="button"
                  onClick={() => setUserType('company')}
                  className={`p-4 rounded-lg border transition-all ${
                    userType === 'company'
                      ? 'border-blue-400 bg-blue/20 text-blue-200'
                      : 'border-blue/20 bg-blue/10 text-blue-300 hover:bg-blue/15'
                  }`}
                >
                  <Building className="w-6 h-6 mx-auto mb-2" />
                  <div className="text-sm font-medium">Company</div>
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 2: Verification */}
        {activeStep === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {userType === 'individual' ? (
              <>
                <div>
                  <label className="block text-blue-300 text-sm mb-2">Birthday *</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 w-5 h-5 text-blue-400" />
                    <input
                      type="date"
                      value={formData.birthday}
                      onChange={(e) => updateFormData('birthday', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-blue/10 border border-blue/20 rounded-lg text-blue-200 focus:border-blue-400 focus:outline-none"
                    />
                  </div>
                  {errors.birthday && (
                    <p className="text-red-400 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.birthday}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-blue-300 text-sm mb-2">ID Number *</label>
                  <div className="relative">
                    <IdCard className="absolute left-3 top-3 w-5 h-5 text-blue-400" />
                    <input
                      type="text"
                      value={formData.idNumber}
                      onChange={(e) => updateFormData('idNumber', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-blue/10 border border-blue/20 rounded-lg text-blue-200 placeholder-blue-400 focus:border-blue-400 focus:outline-none"
                      placeholder="Enter your ID number"
                    />
                  </div>
                  {errors.idNumber && (
                    <p className="text-red-400 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.idNumber}
                    </p>
                  )}
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-blue-300 text-sm mb-2">Company ID *</label>
                  <div className="relative">
                    <Building className="absolute left-3 top-3 w-5 h-5 text-blue-400" />
                    <input
                      type="text"
                      value={formData.companyId}
                      onChange={(e) => updateFormData('companyId', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-blue/10 border border-blue/20 rounded-lg text-blue-200 placeholder-blue-400 focus:border-blue-400 focus:outline-none"
                      placeholder="Enter company registration ID"
                    />
                  </div>
                  {errors.companyId && (
                    <p className="text-red-400 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.companyId}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-blue-300 text-sm mb-2">Company Founding Date *</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 w-5 h-5 text-blue-400" />
                    <input
                      type="date"
                      value={formData.companyBirthday}
                      onChange={(e) => updateFormData('companyBirthday', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-blue/10 border border-blue/20 rounded-lg text-blue-200 focus:border-blue-400 focus:outline-none"
                    />
                  </div>
                  {errors.companyBirthday && (
                    <p className="text-red-400 text-sm mt-1 flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.companyBirthday}
                    </p>
                  )}
                </div>
              </>
            )}

            <div className="bg-blue/5 p-4 rounded-lg">
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-blue-400 mt-0.5" />
                <div>
                  <h4 className="font-bold text-blue-200 mb-1">Verification Required</h4>
                  <p className="text-blue-300 text-sm">
                    {userType === 'individual' 
                      ? 'Your birthday and ID number are required for account verification and security.'
                      : 'Company ID and founding date are required for business account verification.'
                    }
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 3: Security */}
        {activeStep === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <label className="block text-blue-300 text-sm mb-2">Password *</label>
              <div className="relative">
                <Shield className="absolute left-3 top-3 w-5 h-5 text-blue-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => updateFormData('password', e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-blue/10 border border-blue/20 rounded-lg text-blue-200 placeholder-blue-400 focus:border-blue-400 focus:outline-none"
                  placeholder="Create a secure password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-blue-400 hover:text-blue-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.password}
                </p>
              )}
            </div>

            <div>
              <label className="block text-blue-300 text-sm mb-2">Confirm Password *</label>
              <div className="relative">
                <Shield className="absolute left-3 top-3 w-5 h-5 text-blue-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-blue/10 border border-blue/20 rounded-lg text-blue-200 placeholder-blue-400 focus:border-blue-400 focus:outline-none"
                  placeholder="Confirm your password"
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-red-400 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <div className="bg-green-500/10 p-4 rounded-lg border border-green-500/20">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                <div>
                  <h4 className="font-bold text-green-400 mb-1">Registration Summary</h4>
                  <div className="text-green-300 text-sm space-y-1">
                    <p>Name: {formData.name}</p>
                    <p>Email: {formData.email}</p>
                    <p>Type: {userType === 'individual' ? 'Individual Account' : 'Company Account'}</p>
                    {userType === 'individual' ? (
                      <p>ID: {formData.idNumber}</p>
                    ) : (
                      <p>Company ID: {formData.companyId}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={handleBack}
            disabled={activeStep === 1}
            className="px-6 py-3 bg-blue/10 text-blue-300 rounded-lg hover:bg-blue/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Back
          </button>

          {activeStep < 3 ? (
            <button
              onClick={handleNext}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all disabled:opacity-50 flex items-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <span>Create Account</span>
              )}
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};