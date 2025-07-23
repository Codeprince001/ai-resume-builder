import Link from "next/link";

export default function Pricing() {
  return (
    <section className="w-full py-16 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Simple Pricing</h2>
        <p className="text-gray-600 mb-8">
          Start enhancing your resume for just <span className="font-semibold text-blue-600">$2.5/month</span>.
        </p>

        <div className="bg-white shadow-lg rounded-xl p-8 mx-auto max-w-md">
          <h3 className="text-2xl font-semibold mb-4">Premium Plan</h3>
          <p className="text-4xl font-bold mb-4">$2.5<span className="text-base font-normal">/month</span></p>

          <ul className="text-left text-gray-700 space-y-3 mb-6">
            <li>✅ Unlimited AI resume enhancements</li>
            <li>✅ Tailor resumes to job descriptions</li>
            <li>✅ Export to PDF with ease</li>
            <li>✅ Priority enhancement queue</li>
            <li>✅ Early access to future tools</li>
          </ul>

          <Link href="/subscribe">
            <button className="w-full text-white text-lg py-6 bg-blue-600 cursor-pointer rounded">Start Free Trial</button>
          </Link>
        </div>
      </div>
    </section>
  );
}
