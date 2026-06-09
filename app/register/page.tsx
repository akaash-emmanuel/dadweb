"use client";

import React, { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, CheckCircle2, Lock, ShieldCheck, Smartphone } from "lucide-react";
import Link from "next/link";

const COURSE_DATA: Record<string, { name: string; modules: string[] }> = {
  ca: {
    name: "Chartered Accountancy (CA)",
    modules: ["Business Laws", "Strategic Management", "Securities Laws and Economic Laws", "Corporate and Other Laws"]
  },
  cma: {
    name: "Cost & Management Accounting (CMA)",
    modules: ["Business Laws", "⁠Business Economics", "⁠Strategic Management", "Corporate and Economic Laws"]
  },
  cs: {
    name: "Company Secretary (CS)",
    modules: ["Business Laws", "Business Economics", "Jurisprudence, Interpretation & General Laws (JIGL)", "Company Law & Practice", "Setting Up of Business, Industrial & Labour Laws", "Capital Market & Securities Laws", "Economic, Commercial & Intellectual Property Laws"]
  }
};

function RegisterForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const courseId = searchParams.get("course");
  
  const [course, setCourse] = useState("ca");
  const [selectedModule, setSelectedModule] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  
  // OTP state
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Sync course search parameter
  useEffect(() => {
    if (courseId === "ca" || courseId === "cma" || courseId === "cs") {
      setCourse(courseId);
    }
  }, [courseId]);

  // Update modules list when selected course changes
  useEffect(() => {
    const modules = COURSE_DATA[course]?.modules || [];
    if (modules.length > 0) {
      setSelectedModule(modules[0]);
    }
  }, [course]);

  // Handle OTP trigger
  const handleSendOtp = async () => {
    if (!phone || phone.length < 10) {
      setOtpError("Please enter a valid 10-digit phone number first.");
      return;
    }
    setOtpError("");
    setIsSendingOtp(true);
    // Simulate sending OTP SMS
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSendingOtp(false);
    setIsOtpSent(true);
  };

  // Handle OTP verification
  const handleVerifyOtp = () => {
    if (otp === "1234") {
      setIsPhoneVerified(true);
      setOtpError("");
    } else {
      setOtpError("Incorrect OTP! Use the test code: 1234");
    }
  };

  // Submit registration form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPhoneVerified) {
      setOtpError("Please verify your phone number using the OTP first.");
      return;
    }
    
    setIsLoading(true);
    
    const registrationDetails = {
      name,
      email,
      phone,
      courseName: COURSE_DATA[course].name,
      module: selectedModule,
      comments: message
    };

    // Google Sheets Integration (Optional Webhook POST)
    // Primary: Set the environment variable NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL in Netlify/hosting.
    // Secondary: Replace the empty string below directly with your Apps Script Web App URL.
    const GOOGLE_SHEETS_WEBHOOK_URL = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL || ""; 
    
    if (GOOGLE_SHEETS_WEBHOOK_URL) {
      try {
        await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
          method: "POST",
          mode: "no-cors", // Required to bypass browser CORS checks with Google Scripts
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...registrationDetails,
            date: new Date().toLocaleString()
          })
        });
      } catch (error) {
        console.error("Google Sheets Submission Error:", error);
      }
    }

    // Simulate API submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setIsLoading(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="text-center space-y-6 max-w-md mx-auto py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-2">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h2 className="font-display text-3xl lg:text-4xl text-foreground font-semibold">
          Registration Complete!
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          Thank you, <strong>{name}</strong>! Your enquiry for the <strong>{COURSE_DATA[course].name} ({selectedModule})</strong> program has been logged in the sheet.
        </p>
        <div className="pt-6">
          <Button onClick={() => router.push("/")} size="lg" className="w-full py-6 rounded-xl">
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-8 flex items-center">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>

      <div className="bg-card/75 border border-border/40 backdrop-blur-md p-8 lg:p-12 rounded-3xl shadow-xl relative overflow-hidden">
        {/* Decorative top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary/80 to-primary rounded-t-3xl" />
        
        <div className="mb-8">
          <h1 className="font-display text-4xl text-foreground font-semibold mb-3">
            Register Your Interest
          </h1>
          <p className="text-muted-foreground leading-relaxed">
            Please fill in your details. Dynamic course modules will load depending on your selection.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div className="space-y-2">
            <label className="text-sm font-mono text-foreground font-medium uppercase tracking-wider block">
              Full Name
            </label>
            <Input 
              type="text" 
              placeholder="Enter your name" 
              required 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-background/80 border-border/60 focus-visible:ring-primary rounded-xl p-6"
            />
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label className="text-sm font-mono text-foreground font-medium uppercase tracking-wider block">
              Email Address
            </label>
            <Input 
              type="email" 
              placeholder="you@example.com" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-background/80 border-border/60 focus-visible:ring-primary rounded-xl p-6"
            />
          </div>

          {/* Phone Field + OTP verification */}
          <div className="space-y-2">
            <label className="text-sm font-mono text-foreground font-medium uppercase tracking-wider block">
              Phone Number
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input 
                  type="tel" 
                  placeholder="10-digit phone number" 
                  required 
                  disabled={isPhoneVerified}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                  className="bg-background/80 border-border/60 focus-visible:ring-primary rounded-xl p-6 pl-10"
                />
                <Smartphone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              </div>
              
              {!isPhoneVerified && (
                <Button 
                  type="button" 
                  onClick={handleSendOtp}
                  disabled={isSendingOtp || !phone || phone.length < 10}
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/5 rounded-xl px-5 h-auto text-xs font-mono uppercase"
                >
                  {isSendingOtp ? "Sending..." : isOtpSent ? "Resend OTP" : "Send OTP"}
                </Button>
              )}
            </div>
            
            {/* OTP code input */}
            {isOtpSent && !isPhoneVerified && (
              <div className="mt-3 p-4 bg-primary/5 rounded-xl border border-primary/20 space-y-3">
                <p className="text-xs text-primary font-mono">
                  [DEMO] OTP Sent to phone! Enter code <strong className="underline">1234</strong> to verify:
                </p>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    maxLength={4}
                    placeholder="Enter 4-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                    className="bg-background/90 border-border/60 focus-visible:ring-primary rounded-xl text-center font-mono tracking-widest text-lg py-4 max-w-[160px]"
                  />
                  <Button 
                    type="button" 
                    onClick={handleVerifyOtp}
                    disabled={otp.length !== 4}
                    className="bg-primary text-primary-foreground rounded-xl text-xs font-mono uppercase px-6"
                  >
                    Verify OTP
                  </Button>
                </div>
              </div>
            )}

            {isPhoneVerified && (
              <div className="flex items-center gap-2 text-emerald-600 bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl text-sm font-medium">
                <ShieldCheck className="w-5 h-5" />
                <span>Phone number verified successfully!</span>
              </div>
            )}
            
            {otpError && (
              <p className="text-xs text-destructive font-mono mt-1">{otpError}</p>
            )}
          </div>

          {/* Dynamic Dropdown: Course selection */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-mono text-foreground font-medium uppercase tracking-wider block">
                Course
              </label>
              <div className="relative">
                <select 
                  value={course} 
                  onChange={(e) => setCourse(e.target.value)}
                  className="w-full bg-background/80 border border-border/60 hover:border-border transition-colors text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary rounded-xl p-4 text-base appearance-none cursor-pointer"
                >
                  <option value="ca">CA (Chartered Accountancy)</option>
                  <option value="cma">CMA (Cost Accounting)</option>
                  <option value="cs">CS (Company Secretary)</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-foreground/50">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Dynamic Dropdown: Course Modules (Changes per selected course) */}
            <div className="space-y-2">
              <label className="text-sm font-mono text-foreground font-medium uppercase tracking-wider block">
                Module / Subject
              </label>
              <div className="relative">
                <select 
                  value={selectedModule} 
                  onChange={(e) => setSelectedModule(e.target.value)}
                  className="w-full bg-background/80 border border-border/60 hover:border-border transition-colors text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary rounded-xl p-4 text-base appearance-none cursor-pointer"
                >
                  {(COURSE_DATA[course]?.modules || []).map((mod) => (
                    <option key={mod} value={mod}>{mod}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-foreground/50">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Comments */}
          <div className="space-y-2">
            <label className="text-sm font-mono text-foreground font-medium uppercase tracking-wider block">
              Additional Details
            </label>
            <Textarea 
              placeholder="Ask us anything about batch timings, fees, or study materials" 
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bg-background/80 border-border/60 focus-visible:ring-primary rounded-xl p-4 min-h-[80px]"
            />
          </div>

          {/* Submission button */}
          <Button 
            type="submit" 
            size="lg" 
            disabled={isLoading || !isPhoneVerified}
            className="w-full bg-primary hover:bg-primary/95 text-primary-foreground font-medium uppercase tracking-widest text-sm rounded-xl py-6 transition-all duration-300 hover:shadow-lg shadow-md mt-4 flex items-center justify-center gap-2"
          >
            {!isPhoneVerified && <Lock className="w-4 h-4" />}
            {isLoading ? "Submitting..." : isPhoneVerified ? "Submit Registration" : "Verify Phone to Submit"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-background text-foreground py-20 lg:py-28 px-6 noise-overlay flex items-center">
      <Suspense fallback={
        <div className="max-w-xl mx-auto text-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary mx-auto"></div>
        </div>
      }>
        <RegisterForm />
      </Suspense>
    </main>
  );
}
