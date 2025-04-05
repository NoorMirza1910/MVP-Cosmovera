"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowRight, ArrowLeft, Check } from "lucide-react"

export default function ProfilePage() {
  const [step, setStep] = useState(1)
  const [profile, setProfile] = useState({
    skinType: "",
    concerns: [] as string[],
    sensitivities: [] as string[],
    goals: [] as string[],
  })

  const handleSkinTypeChange = (value: string) => {
    setProfile((prev) => ({ ...prev, skinType: value }))
  }

  const handleConcernToggle = (value: string) => {
    setProfile((prev) => {
      if (prev.concerns.includes(value)) {
        return { ...prev, concerns: prev.concerns.filter((item) => item !== value) }
      } else {
        return { ...prev, concerns: [...prev.concerns, value] }
      }
    })
  }

  const handleSensitivityToggle = (value: string) => {
    setProfile((prev) => {
      if (prev.sensitivities.includes(value)) {
        return { ...prev, sensitivities: prev.sensitivities.filter((item) => item !== value) }
      } else {
        return { ...prev, sensitivities: [...prev.sensitivities, value] }
      }
    })
  }

  const handleGoalToggle = (value: string) => {
    setProfile((prev) => {
      if (prev.goals.includes(value)) {
        return { ...prev, goals: prev.goals.filter((item) => item !== value) }
      } else {
        return { ...prev, goals: [...prev.goals, value] }
      }
    })
  }

  const nextStep = () => {
    setStep((prev) => prev + 1)
  }

  const prevStep = () => {
    setStep((prev) => prev - 1)
  }

  const handleSubmit = () => {
    // In a real app, this would save the profile to a database
    console.log("Profile submitted:", profile)
    setStep(4) // Move to completion step
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[#0A1A3D] mb-6">Create Your Skin Profile</h1>
        <p className="text-gray-600 mb-8">
          Answer a few questions about your skin to receive personalized product recommendations and safety analyses.
        </p>

        <div className="mb-8">
          <div className="flex justify-between items-center">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div key={stepNumber} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step >= stepNumber ? "bg-[#0A1A3D] text-white" : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step > stepNumber ? <Check className="h-5 w-5" /> : stepNumber}
                </div>
                <span className="text-xs mt-2 text-gray-500">
                  {stepNumber === 1 && "Skin Type"}
                  {stepNumber === 2 && "Concerns"}
                  {stepNumber === 3 && "Goals"}
                  {stepNumber === 4 && "Complete"}
                </span>
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 h-1 mt-4 rounded-full">
            <div
              className="bg-[#0A1A3D] h-1 rounded-full transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            ></div>
          </div>
        </div>

        <Card className="border-2 border-gray-100">
          <CardContent className="p-6">
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-[#0A1A3D]">What's your skin type?</h2>
                <RadioGroup value={profile.skinType} onValueChange={handleSkinTypeChange}>
                  {["Dry", "Oily", "Combination", "Normal", "Sensitive"].map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <RadioGroupItem value={type} id={`skin-${type.toLowerCase()}`} />
                      <Label htmlFor={`skin-${type.toLowerCase()}`}>{type}</Label>
                    </div>
                  ))}
                </RadioGroup>

                <h2 className="text-xl font-semibold text-[#0A1A3D] pt-4">Do you have any skin sensitivities?</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {["Fragrance", "Alcohol", "Essential Oils", "Sulfates", "Parabens", "Silicones"].map(
                    (sensitivity) => (
                      <div key={sensitivity} className="flex items-center space-x-2">
                        <Checkbox
                          id={`sensitivity-${sensitivity.toLowerCase().replace(/\s+/g, "-")}`}
                          checked={profile.sensitivities.includes(sensitivity)}
                          onCheckedChange={() => handleSensitivityToggle(sensitivity)}
                        />
                        <Label htmlFor={`sensitivity-${sensitivity.toLowerCase().replace(/\s+/g, "-")}`}>
                          {sensitivity}
                        </Label>
                      </div>
                    ),
                  )}
                </div>

                <div className="flex justify-end">
                  <Button onClick={nextStep} className="bg-[#0A1A3D] hover:bg-[#152A5C]">
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-[#0A1A3D]">What are your skin concerns?</h2>
                <p className="text-gray-600">Select all that apply</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    "Acne",
                    "Aging",
                    "Dark Spots",
                    "Dryness",
                    "Redness",
                    "Uneven Texture",
                    "Large Pores",
                    "Fine Lines",
                    "Dullness",
                  ].map((concern) => (
                    <div key={concern} className="flex items-center space-x-2">
                      <Checkbox
                        id={`concern-${concern.toLowerCase().replace(/\s+/g, "-")}`}
                        checked={profile.concerns.includes(concern)}
                        onCheckedChange={() => handleConcernToggle(concern)}
                      />
                      <Label htmlFor={`concern-${concern.toLowerCase().replace(/\s+/g, "-")}`}>{concern}</Label>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={prevStep}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  <Button onClick={nextStep} className="bg-[#0A1A3D] hover:bg-[#152A5C]">
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-[#0A1A3D]">What are your skincare goals?</h2>
                <p className="text-gray-600">Select all that apply</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    "Clear Skin",
                    "Anti-Aging",
                    "Hydration",
                    "Even Skin Tone",
                    "Reduce Redness",
                    "Minimize Pores",
                    "Brighten Skin",
                    "Sun Protection",
                  ].map((goal) => (
                    <div key={goal} className="flex items-center space-x-2">
                      <Checkbox
                        id={`goal-${goal.toLowerCase().replace(/\s+/g, "-")}`}
                        checked={profile.goals.includes(goal)}
                        onCheckedChange={() => handleGoalToggle(goal)}
                      />
                      <Label htmlFor={`goal-${goal.toLowerCase().replace(/\s+/g, "-")}`}>{goal}</Label>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={prevStep}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  <Button onClick={handleSubmit} className="bg-[#D4AF37] hover:bg-[#C09C2C] text-[#0A1A3D]">
                    Complete Profile
                    <Check className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-semibold text-[#0A1A3D]">Profile Created Successfully!</h2>
                <p className="text-gray-600">
                  Your personalized skin profile has been created. We'll use this information to provide you with
                  tailored product recommendations and safety analyses.
                </p>
                <Button
                  className="bg-[#0A1A3D] hover:bg-[#152A5C]"
                  onClick={() => (window.location.href = "/recommendations")}
                >
                  View Recommendations
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

