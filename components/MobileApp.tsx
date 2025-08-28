import Image from "next/image";
import mobileApp from "@/public/images/mobile-view.png";

export const GetItOnMobile = () => {
  return (
    <section className="w-full py-16 px-4 md:px-12">
      <div className="max-w-6xl mx-auto bg-blue-50 rounded-2xl px-6 py-12 md:py-16 md:px-12 flex flex-col-reverse md:flex-row items-center justify-between gap-8 shadow-sm">
        
        {/* Left Content */}
        <div className="flex-1 text-center md:text-left space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Get it on Mobile
          </h2>
          <p className="text-gray-600 text-base md:text-lg">
            Use our resume tools anytime, anywhere. Download the app and boost your job search on the go.
          </p>
          
          <div className="flex justify-center md:justify-start gap-4">
            <a href="#">
              <Image 
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Get it on Google Play"
                width={160}
                height={48}
              />
            </a>
            <a href="#">
              <Image 
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="Download on the App Store"
                width={160}
                height={48}
              />
            </a>
          </div>
        </div>

        {/* Right Image - Hidden on mobile */}
        <div className="flex-1 hidden md:block">
          <Image
            src={mobileApp}
            alt="Mobile App Preview"
            width={300}
            height={400}
            className="mx-auto"
            priority
          />
        </div>
      </div>
    </section>
  );
};
