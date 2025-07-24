import { ChevronLeft, ChevronRight, MapPin, Quote, Star } from "lucide-react";
import { TestimonialType } from "@/lib/interfaces/TestimonialType";
import { useState } from "react";

type TestimonialProps = {
    testimonials: TestimonialType[];
}

export default function Testimonial({ testimonials }: TestimonialProps) {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);

    const nextTestimonial = () => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <section className="py-20 bg-background poppins">
            <div className="container-max section-padding">
                <div className="relative max-w-4xl mx-auto mb-16">
                    <div className="bg-gradient-to-br from-background to-white rounded-3xl p-8 md:p-12 shadow-xl">
                        <div className="flex items-center justify-center mb-8">
                            <Quote className="w-16 h-16 text-highlight opacity-50" />
                        </div>

                        <div className="text-center mb-8">
                            <p className="text-xl md:text-2xl text-foreground leading-relaxed mb-6 italic">
                                "{testimonials[currentTestimonial].text}"
                            </p>
                        </div>

                        <div className="flex items-center justify-center space-x-4">
                            <img
                                src={testimonials[currentTestimonial].image}
                                alt={testimonials[currentTestimonial].name}
                                className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                            />
                            <div className="text-left">
                                <h4 className="font-bold text-foreground text-lg montserrat">
                                    {testimonials[currentTestimonial].name}
                                </h4>
                                <p className="text-foreground-secondary">{testimonials[currentTestimonial].role}</p>
                                <div className="flex items-center space-x-1 mt-1">
                                    <MapPin className="w-4 h-4 text-highlight" />
                                    <span className="text-sm text-foreground-secondary">{testimonials[currentTestimonial].location}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-center space-x-1 mt-6">
                            {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                                <Star key={i} className="w-6 h-6 text-highlight fill-current" />
                            ))}
                        </div>
                    </div>

                    {testimonials.length > 1 && (
                        <>
                            <button
                                onClick={prevTestimonial}
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-background transition-all duration-300 hover:scale-110"
                            >
                                <ChevronLeft className="w-6 h-6 text-primary" />
                            </button>

                            <button
                                onClick={nextTestimonial}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-background transition-all duration-300 hover:scale-110"
                            >
                                <ChevronRight className="w-6 h-6 text-primary" />
                            </button>
                        </>
                    )}
                </div>

                {testimonials.length > 1 && (
                    <div className="flex items-center justify-center space-x-3 mb-16">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentTestimonial(index)}
                                className={`h-3 rounded-full transition-all duration-300 ${index === currentTestimonial
                                    ? 'bg-primary w-8'
                                    : 'bg-gray-300 hover:bg-gray-400 w-3'
                                    }`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
