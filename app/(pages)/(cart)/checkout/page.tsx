"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(11, { message: "Phone number must be at least 11 digits" }),
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  country: z.string().min(1, { message: "Please select a country" }),
  city: z.string().min(1, { message: "Please select a city" }),
  address: z.string().min(5, { message: "Address must be at least 5 characters" }),
  defaultAddress: z.boolean().optional(),
  paymentMethod: z.string().min(1, { message: "Please select a payment method" }),
})

export default function CheckoutForm() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      phone: "",
      name: "",
      country: "Egypt",
      city: "Cairo",
      address: "",
      defaultAddress: false,
      paymentMethod: "card",
    },
  })

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

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      console.log(values)
      setIsSubmitting(false)
      router.push("/checkout/last")
    }, 1000)
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Contact Information */}
          <div>
            <h1 className="text-3xl fonusert-bold mb-6">Contact</h1>

            <div className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl">Email</FormLabel>
                    <FormControl>
                      <Input placeholder="user@gmail.com" {...field} className="p-4 text-base" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl">Phone number</FormLabel>
                    <FormControl>
                      <Input placeholder="Phone number" {...field} className="p-4 text-base" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl">Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" {...field} className="p-4 text-base" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="h-px bg-gray-200 my-4"></div>

          {/* Shipping Address */}
          <div>
            <h2 className="text-3xl font-bold mb-6">Shipping address</h2>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xl">Country</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="p-3 text-base">
                            <SelectValue placeholder="Select a country">
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
                            </SelectValue>
                          </SelectTrigger>
                        </FormControl>
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
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xl">City</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="p-3 text-base">
                            <SelectValue placeholder="Select a city" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Cairo">Cairo</SelectItem>
                          <SelectItem value="Alexandria">Alexandria</SelectItem>
                          <SelectItem value="Giza">Giza</SelectItem>
                          <SelectItem value="Sharm El Sheikh">Sharm El Sheikh</SelectItem>
                          <SelectItem value="Luxor">Luxor</SelectItem>
                          <SelectItem value="Aswan">Aswan</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl">Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Nasr city" {...field} className="p-4 text-base" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="defaultAddress"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="h-5 w-5 mt-1 border-2 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-base font-normal">Set as a default shipping address</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="h-px bg-gray-200 my-4"></div>

          {/* Payment */}
          <div>
            <h2 className="text-3xl font-bold mb-6">Payment</h2>

            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="space-y-4">
                      {paymentMethods.map((method) => (
                        <div key={method.id} className="flex items-center gap-3">
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value={method.id} id={method.id} className="h-6 w-6" />
                            </FormControl>
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 flex items-center justify-center">
                                <img src={method.img || "/placeholder.svg"} alt={method.label} className="h-6 w-6" />
                              </div>
                              <FormLabel className="text-xl font-normal" htmlFor={method.id}>
                                {method.label}
                              </FormLabel>
                            </div>
                          </FormItem>
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="w-full py-6 text-lg mt-8" disabled={isSubmitting}>
            {isSubmitting ? "Processing..." : "Proceed to Checkout"}
          </Button>
        </form>
      </Form>
    </div>
  )
}
