import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Html,
    Preview,
    Text,
    Img,
    Row,
    Column,
    Section,
  } from "@react-email/components";
 
  
  export function ResetPasswordEmail({
    resetLink, userName 
  }: {
    resetLink: string;
    userName: string|null;
  }) {
    const main = {
      backgroundColor: "#ffffff",
    };
    const h1 = {
      color: "#333",
      fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
      fontSize: "24px",
      fontWeight: "bold",
      margin: "40px 0",
      padding: "0",
    };
    const text = {
      color: "#333",
      fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
      fontSize: "14px",
      margin: "24px 0",
    };
    const container = {
      paddingLeft: "12px",
      paddingRight: "12px",
      margin: "0 auto",
    };
    const button = {
      backgroundColor: "#A18072",
      borderRadius: "3px",
      fontWeight: "600",
      color: "#fff",
      fontSize: "14px",
      textDecoration: "none",
      textAlign: "center" as const,
      display: "block",
      padding: "11px 23px",
    };
  
  // Convert the logo svg fil to data uri so as to allow the email recipient 
  // to see the icon as part of the email content
    const svgString = `
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <title>Ghost Icon</title>
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm.256 2.313c2.47.005 5.116 2.008 5.898 2.962l.244.3c1.64 1.994 3.569 4.34 3.569 6.966 0 3.719-2.98 5.808-6.158 7.508-1.433.766-2.98 1.508-4.748 1.508-4.543 0-8.366-3.569-8.366-8.112 0-.706.17-1.425.342-2.15.122-.515.244-1.033.307-1.549.548-4.539 2.967-6.795 8.422-7.408a4.29 4.29 0 01.49-.026Z"></path>
  </svg>
  `.trim();
  
    const svgBase64 = Buffer.from(svgString).toString("base64");
    const dataUri = `data:image/svg+xml;base64,${svgBase64}`;
  
    return (
      <Html>
        <Head />
        <Preview>Reset your password with this link</Preview>
        <Body>
          <Container style={container}>
            <Section>
              <Row>
                <Column  align="left" width="5">
                  <Img
                    src={dataUri}
                    width="32"
                    height="32"
                    alt="Fix Flow"
                    style={{borderRadius: 21 }}
                  />
                  
                </Column >
                <Column align="left" width="450" style={{marginLeft: "10px"}}>
                  <Text style={{ ...text, fontSize: "20px", fontWeight: "bold" }}>
                    Fix Flow
                  </Text>
                </Column>
              </Row>
            </Section>
  
            <Heading style={h1}>Reset your password</Heading>
            <Text style={{ ...text, marginBottom: "14px" }}>
                Hi {userName},
                </Text>
            <Text style={{ ...text, marginBottom: "14px" }}>
            Someone recently requested a password change for your FixFlow
              account. If this was you, you can set a new password here:
            </Text>
            <Button style={button} href={resetLink}>
              Reset password
            </Button>
            <Text
              style={{
                ...text,
                color: "#ababab",
                marginTop: "14px",
                marginBottom: "16px",
              }}
            >
              If you didn&apos;t want to change your password or didn&apos;t make this request, please disregard this email.
            </Text>
          </Container>
        </Body>
      </Html>
    );
  }
  
  export default ResetPasswordEmail;
  