import { Instagram, MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
import crLogo from "@/assets/cr-fitness-logo.png";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
          <div>
            <div className="mb-4">
              <img src={crLogo} alt="CR Fitness" className="h-16 w-16 rounded-full object-cover" />
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Premium fitness facility dedicated to transforming lives through expert coaching, modern equipment, and an unbeatable community.
            </p>
            <p className="text-sm text-primary font-accent flex items-center gap-2">
              <Clock className="w-4 h-4" /> Open 7 Days | 5:00 AM – 10:00 PM
            </p>
          </div>
          <div>
            <h4 className="font-heading text-xl mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["About", "Programs", "Trainers", "Pricing", "Schedule", "Contact"].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="text-muted-foreground text-sm hover:text-primary transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-heading text-xl mb-4">Contact</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2"><MapPin className="w-4 h-4 text-primary shrink-0 mt-1" /> <span>Sec-86 opposite SRS Royal Hills<br/>- Faridabad(HR)</span></li>
              <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary" /> +91 78369 09669</li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary" /> crfitness93@gmail.com</li>
            </ul>
          </div>
          <div>
            <h4 className="font-heading text-xl mb-4">Follow Us</h4>
            <div className="flex gap-3">
              {[
                { icon: Instagram, href: "https://www.instagram.com/cr.fitness.86?igsh=MTNieG40MmZkbXhibw==", className: "hover:text-[#E1306C] hover:bg-[#E1306C]/10" },
                { icon: MessageCircle, href: "https://wa.me/917836909669", className: "hover:text-[#25D366] hover:bg-[#25D366]/10" }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className={`w-10 h-10 rounded-lg glass flex items-center justify-center transition-colors ${
                    social.className || "text-muted-foreground hover:text-primary hover:bg-primary/10"
                  }`}
                  target={social.href.startsWith('http') ? "_blank" : "_self"}
                  rel={social.href.startsWith('http') ? "noopener noreferrer" : ""}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-border mt-12 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2026 CR Fitness. All rights reserved. | Walk in Strong, Walk out Stronger.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
