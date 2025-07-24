import Container from "@/components/Container";
import SectionTitle from "@/components/sections/SectionTitle";

export default function GalleryPage() {
    return (
        <div>
            <Container>
                <div className="flex flex-col items-center justify-center py-10 px-4">
                    <SectionTitle subtitle="Explore a beleza e diversidade cultural da nossa região através de imagens que capturam momentos únicos.">
                        Galeria Cultural
                    </SectionTitle>
                </div>
            </Container>
        </div>
    );
}
