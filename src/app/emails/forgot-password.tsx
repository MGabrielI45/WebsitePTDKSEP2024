import {
    Body,
    Button,
    Container,
    Column,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Row,
    Section,
    Tailwind,
    Text,
    Font
} from '@react-email/components';
import * as React from 'react';

interface ForgotPasswordEmailProps {
    username: string;
}
  
export const forgotPasswordEmail: React.FC<Readonly<ForgotPasswordEmailProps>> = ({
    username
}) => (
    <Html>
        <Head>
            <Font
                fontFamily="Montserrat"
                fallbackFontFamily="Verdana"    
                webFont={{
                    url: "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,900;1,800&display=swap",
                    format: "woff2",
                }}
                fontWeight={400}
                fontStyle="normal"
            />
        </Head>
        <Preview> Forgot Email </Preview>
        <Tailwind>
            <Body className="bg-slate-100 p-10 my-auto mx-auto">
                <Container className="rounded-lg bg-white mx-auto w-1/2 p-10">
                    <Section className="mb-5">
                        <Img
                            src="https://ksep-itb.com/static/media/Logo-Home.c767d475c54102a96a15.png"
                            alt="Vercel"
                            width="100"
                            className="my-0 -mb-5 mx-auto"
                        />
                        <Heading className="text-black text-2xl font-bold text-center">
                            Forgot Password...
                        </Heading>
                    </Section>
                    <Hr />
                    <Section className="mt-5">
                        <Text className="text-black text-sm">
                        Hello,
                        </Text>
                        <Text className="text-black text-sm">
                            The PTD KSEP account <strong>{username}</strong> forgot their password. 
                        </Text>
                    </Section>
                    <Section className="text-center mt-5">
                        <Button
                            href="https://example.com"
                            className="block rounded-lg bg-[#3B81A6] py-3 px-8 text-white text-base font-bold"
                        >
                            Resolve
                        </Button>
                    </Section>
                </Container>
            </Body>
        </Tailwind>
    </Html>
);