import { Theme } from "next-auth";
import { EmailConfig } from "next-auth/providers/email";
import { createTransport } from "nodemailer"
import { render } from "@react-email/render";
import prisma from "@/prisma/client";
import EmailProviderEmail from "@/app/components/EmailProviderEmail";



interface Params {
    identifier: string;
     url: string;
      provider: EmailConfig;

}

export async function customEmailProviderEmail ({identifier, url, provider} : Params ) {
   try {
    const { host } = new URL(url);
    const transport = createTransport(provider.server);

    const user = await prisma.user.findUnique({
        where: {email: identifier}
    })

    

    const emailHtml = render(EmailProviderEmail({ signinLink:url, username: user?.name }), {
        pretty: true,
      });

    const result = transport.sendMail({
        to: identifier,
        from: provider.from,
        subject: `Sign in to ${host}`,
        html:emailHtml
    })
    const failed = (await result).rejected.concat((await result).pending).filter(Boolean)
    if (failed.length) {
      throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`)
    }

}catch (error: any) {
    throw new Error(error?.message);
  }

}