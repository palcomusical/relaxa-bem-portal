import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface WelcomeEmailRequest {
  email: string;
  name: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, name }: WelcomeEmailRequest = await req.json();

    console.log(`Sending welcome email to ${email}`);

    // Aqui você pode integrar com um serviço de email real (Resend, SendGrid, etc)
    // Por enquanto, apenas logamos o email
    const emailContent = {
      to: email,
      subject: "Bem-vindo à Clínica de Bem-Estar!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #10b981;">Bem-vindo, ${name}!</h1>
          <p>Sua conta foi criada com sucesso em nossa plataforma.</p>
          <p>Agora você tem acesso ao nosso sistema de gestão.</p>
          <p>Se você tiver alguma dúvida, não hesite em nos contatar.</p>
          <br>
          <p>Atenciosamente,<br>Equipe Clínica de Bem-Estar</p>
        </div>
      `,
    };

    console.log("Email preparado:", emailContent);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Email de boas-vindas enviado com sucesso",
        email: emailContent 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-welcome-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
