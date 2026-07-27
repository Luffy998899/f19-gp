/**
 * Driver Capital financing configuration.
 *
 * Formula 19 is an authorised Driver Capital Service Centre. The Service Centre
 * Key is a public identifier — Driver Capital's own integration docs put it in
 * client-side HTML — so it is safe in the bundle, but it lives here alone so
 * there is exactly one place to change it.
 *
 * Docs: https://hs.drivercapital.ca/website-integration
 */
export const DRIVER_CAPITAL_KEY =
  process.env.NEXT_PUBLIC_DRIVER_CAPITAL_KEY || "FORMULA19TIRES"

/** Hosted calculator — fallback when the embedded widget cannot load. */
export const MAX_LOAN_HOSTED_URL = `https://www.drivercapital.ca/maxloan?key=${DRIVER_CAPITAL_KEY}`

export const CALCULATOR_SCRIPT_URL =
  "https://assets.drivercapital.ca/maxloan-calculator/maxloan-calculator.js"
export const CALCULATOR_STYLE_URL =
  "https://assets.drivercapital.ca/maxloan-calculator/maxloan-calculator.css"

export const DRIVER_CAPITAL_PHONE = "(855) 973-7483"

/** Loan limits published by Driver Capital. */
export const LOAN_MIN = 500
export const LOAN_MAX = 10000

export type FinancingProgram = {
  id: "no-credit-check" | "defer-90" | "your-rate"
  num: string
  name: string
  tagline: string
  creditCheck: boolean
  highlights: string[]
}

/**
 * The three programs a customer picks from after their Max Loan amount is
 * known. Two run with no credit check at all; the third trades a credit check
 * for a rate tied to the customer's score.
 */
export const FINANCING_PROGRAMS: FinancingProgram[] = [
  {
    id: "no-credit-check",
    num: "01",
    name: "$0 Down — Drive Today",
    tagline: "No credit check. Approved in seconds.",
    creditCheck: false,
    highlights: [
      "Zero cash down on approved work",
      "Approval based on your vehicle's value, not your score",
      "Monthly or bi-weekly payments up to 3 years",
      "Drive out the same day",
    ],
  },
  {
    id: "defer-90",
    num: "02",
    name: "Don't Pay for 90 Days",
    tagline: "No credit check. First payment in three months.",
    creditCheck: false,
    highlights: [
      "Every benefit of the no-credit-check program",
      "No payments due for the first 90 days",
      "Instant approval, work starts now",
      "Useful when the repair wasn't in this month's budget",
    ],
  },
  {
    id: "your-rate",
    num: "03",
    name: "Your Credit, Your Rate",
    tagline: "Opt into a credit check and unlock your best rate.",
    creditCheck: true,
    highlights: [
      "Rates starting as low as 9.9% OAC",
      "Rate reflects your credit profile",
      "Same fast approval process",
      "Best fit if you have fair to excellent credit",
    ],
  },
]

/**
 * Driver Capital's published requirements. Every customer who meets these is
 * issued a Max Loan guarantee — there is no approve/decline step.
 */
export const ELIGIBILITY_CRITERIA = [
  {
    id: "owner",
    label: "You are the registered owner of the vehicle",
    detail: "The vehicle registration has to be in your name.",
  },
  {
    id: "licence",
    label: "You hold a valid driver's licence",
    detail: "Any valid Canadian licence works.",
  },
  {
    id: "insurance",
    label: "The vehicle is currently insured",
    detail: "Valid, active insurance on the vehicle being serviced.",
  },
  {
    id: "area",
    label: "The vehicle is registered within the service area",
    detail: "Kelowna and the wider Okanagan are covered.",
  },
  {
    id: "banking",
    label: "You can supply banking information",
    detail: "Payments are set up as automatic pre-authorised withdrawals.",
  },
] as const

/**
 * Checked by the calculator itself, so it is shown for transparency rather than
 * asked as a question.
 */
export const AUTOMATIC_CRITERION = {
  label: "The vehicle meets minimum appraisal standards",
  detail:
    "Driver Capital works this out from your vehicle details in the calculator below — it takes seconds and costs nothing.",
} as const

export const FINANCING_FAQS = [
  {
    q: "How much can I borrow?",
    a: "Up to $10,000, based on the value of your vehicle and the work being done. The minimum loan is $500, and you never have to use the full amount you qualify for.",
  },
  {
    q: "Will this affect my credit score?",
    a: "Checking your Max Loan amount involves no credit check and no impact on your score. A credit check only happens if you choose the 'Your Credit, Your Rate' program to try for a lower rate.",
  },
  {
    q: "What if I have poor credit or no credit?",
    a: "Not a problem. The no-credit-check programs approve on vehicle value alone, so your score never enters the picture.",
  },
  {
    q: "How long does approval take?",
    a: "Seconds. There is no waiting on an underwriter — enter your vehicle details in the calculator and your Max Loan guarantee is emailed to you right away.",
  },
  {
    q: "What can I put on the loan at Formula 19?",
    a: "Tires, wheels, TPMS, installation, balancing, alignment-related parts and the labour and taxes that go with them. Parts fitted to your vehicle are eligible; some limitations apply.",
  },
  {
    q: "Can I pay it off early?",
    a: "Yes, any time, with no penalty. Lump-sum payments and payment scheduling are handled in Driver Capital's MyDC borrower portal.",
  },
  {
    q: "Who actually holds the loan?",
    a: "Driver Capital Ltd. Formula 19 is an authorised Service Centre — we do the work and handle the paperwork in store, and Driver Capital handles the lending, payments and support.",
  },
  {
    q: "What is Shepherd Protect?",
    a: "A GPS unit Driver Capital fits to the vehicle as part of setting up the loan. We install it here during your appointment; it takes a few minutes.",
  },
] as const
