"use client"

import { useState } from "react"
import { Check, Pencil } from "lucide-react"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ShippingAddressForm() {
  const [addressType, setAddressType] = useState("new")

  const paymentMethods = [
    {
      id: "card",
      label: "Credit / Debit Card",
      img: "/icons/payment/card.png",
    },
    {
      id: "fawry",
      label: "Fawry",
      img: "/icons/payment/fawry.png",
    },
    {
      id: "instapay",
      label: "Insta Pay",
      img: "/icons/payment/instapay.png",
    },
    {
      id: "orange",
      label: "Orange Money",
      img: "/icons/payment/orange-money.png",
    },
    {
      id: "vodafone",
      label: "Vodafone Cash",
      img: "/icons/payment/vodafone.png",
    },
    {
      id: "etisalat",
      label: "Etisalat Cash",
      img: "/icons/payment/etisalat.png",
    },
  ]

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Shipping address</h1>

      <RadioGroup value={addressType} onValueChange={setAddressType} className="space-y-6">
        <div className="flex items-start gap-3">
          <RadioGroupItem value="saved" id="saved" className="mt-1 h-5 w-5 border-2" />
          <div className="flex-1">
            <Label htmlFor="saved" className="text-xl font-medium">
              Saved address
            </Label>
            <p className="mt-2 text-lg">Nasr city, Cairo, Egypt</p>
          </div>
          <button className="text-blue-600 font-medium flex items-center gap-1">
            Edit <Pencil className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-start gap-3">
          <div className="mt-1 h-5 w-5 rounded-full border-2 flex items-center justify-center">
            {addressType === "new" && <Check className="h-3.5 w-3.5 text-blue-600" />}
          </div>
          <div className="flex-1">
            <Label htmlFor="new" className="text-xl font-medium">
              New address
            </Label>

            <div className="mt-6 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="country" className="text-xl mb-2 block">
                    Country
                  </Label>
                  <Select defaultValue="Egypt">
                    <SelectTrigger className="p-3">
                      <SelectValue placeholder="Select a country">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-5 bg-red-600 relative overflow-hidden">
                            <div className="absolute inset-0 flex flex-col">
                              <div className="h-1/3 bg-red-600"></div>
                              <div className="h-1/3 bg-white"></div>
                              <div className="h-1/3 bg-black"></div>
                            </div>
                          </div>
                          <span className="text-gray-600">Egypt</span>
                        </div>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Egypt">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-5 bg-red-600 relative overflow-hidden">
                            <div className="absolute inset-0 flex flex-col">
                              <div className="h-1/3 bg-red-600"></div>
                              <div className="h-1/3 bg-white"></div>
                              <div className="h-1/3 bg-black"></div>
                            </div>
                          </div>
                          <span>Egypt</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="UAE">UAE</SelectItem>
                      <SelectItem value="Saudi Arabia">Saudi Arabia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="city" className="text-xl mb-2 block">
                    City
                  </Label>
                  <Select defaultValue="Cairo">
                    <SelectTrigger className="p-3">
                      <SelectValue placeholder="Select a city" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cairo">Cairo</SelectItem>
                      <SelectItem value="Alexandria">Alexandria</SelectItem>
                      <SelectItem value="Giza">Giza</SelectItem>
                      <SelectItem value="Sharm El Sheikh">Sharm El Sheikh</SelectItem>
                      <SelectItem value="Luxor">Luxor</SelectItem>
                      <SelectItem value="Aswan">Aswan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="address" className="text-xl mb-2 block">
                  Address
                </Label>
                <Input id="address" placeholder="Nasr city" className="border rounded-md p-3 w-full text-base" />
              </div>
            </div>
          </div>
        </div>
      </RadioGroup>

      <div className="h-px bg-gray-200 my-8"></div>

      <h2 className="text-3xl font-bold mb-6">Payment</h2>

      <RadioGroup defaultValue="card" className="space-y-4">
        {paymentMethods.map((method) => (
          <div key={method.id} className="flex items-center gap-3">
            <RadioGroupItem
              value={method.id}
              id={method.id}
              className="h-6 w-6"
              // Special styling for the first (selected) item
              style={method.id === "card" ? { borderColor: "#FBBF24", backgroundColor: "#FBBF24" } : {}}
            />
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 flex items-center justify-center">
                <img src={method.img || "/placeholder.svg"} alt={method.label} className="h-6 w-6" />
              </div>
              <span className="text-xl">{method.label}</span>
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}
