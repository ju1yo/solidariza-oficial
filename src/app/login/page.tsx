"use client";

import { useState } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

// Componente para o botão de login social (Google e Facebook)
const SocialLoginButton = ({ icon: Icon, provider, className, onClick }: any) => (
  <button
    type="button"
    onClick={onClick}
    className={`p-3 border border-gray-300 rounded-full shadow-sm hover:bg-gray-100 transition ${className}`}
    aria-label={`Login with ${provider}`}
  >
    {/* SE QUISER USAR SUA IMAGEM, SUBSTITUA AQUI */}
    <Image
      src={Icon}
      alt={`${provider} logo`}
      width={28}
      height={28}
      className="object-contain"
    />
  </button>
);

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  async function submit(e: any) {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    if (res?.error) {
      setError("Credenciais inválidas");
      return;
    }

    router.push("/dashboard");
  }

  const handleSocialLogin = (provider: string) => {
    alert(`Tentativa de Login com ${provider}. Implementar lógica real.`);
  };

  return (
    <div className="w-full h-screen flex">

      {/* =====================================================================================
          Lado Esquerdo: Formulário de Login (Branco / Cinza Claro)
        ===================================================================================== */}
      <div className="w-1/2 bg-gray-50 flex flex-col justify-center items-center px-16">

        {/* Logo / Espaçamento (opcional) */}
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-700 text-center">
            Fazer Login
          </h2>
        </div>

        {/* Ícones de login social */}
        <div className="flex gap-6 mb-6">

          {/* Google */}
          <SocialLoginButton
            icon="/google-custom.png"
            provider="Google"
            onClick={() => handleSocialLogin("Google")}
            className="bg-white rounded-full shadow-md hover:bg-gray-100 transition"
          />

          {/* Facebook */}
          <SocialLoginButton
            icon="/facebook-custom.png"
            provider="Facebook"
            onClick={() => handleSocialLogin("Facebook")}
            className="bg-white rounded-full shadow-md hover:bg-gray-100 transition"
          />

        </div>

        {/* Separador "Ou" */}
        <p className="text-gray-500 mb-6 text-lg">Ou</p>

        {/* Formulário */}
        <form
          onSubmit={submit}
          className="w-full max-w-sm flex flex-col gap-4"
        >
          <input
            className="w-full p-3 bg-white shadow rounded-lg border border-gray-200"
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            className="w-full p-3 bg-white shadow rounded-lg border border-gray-200"
            placeholder="Senha"
            type="password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          {error && (
            <div className="mb-2 text-red-600 p-2 bg-red-100 rounded-lg text-center">
              {error}
            </div>
          )}

          <button
            className="mt-2 bg-blue-500 text-white p-3 rounded-full text-lg hover:bg-blue-600 transition shadow"
          >
            Login
          </button>
        </form>
      </div>

      {/* =====================================================================================
          Lado Direito: Degradê Azul + Texto + Botão + Ilustração
        ===================================================================================== */}
      <div className="w-1/2 bg-gradient-to-b from-blue-400 to-blue-600 text-white flex flex-col justify-center px-20 relative">

        <h1 className="text-4xl font-bold mb-4">Seja Bem Vindo</h1>

        <p className="text-lg max-w-sm mb-10 opacity-90 leading-relaxed">
          Junte-se ao Solidariza e faça parte de uma rede que espalha cuidado e esperança.
          Faça login ou cadastre-se para começar a ajudar!
        </p>

        <a
          href="/register"
          className="border-2 border-white px-10 py-3 rounded-full text-lg font-semibold hover:bg-white hover:text-blue-700 transition duration-200 ease-in-out w-fit shadow-md"
        >
          Fazer Registro
        </a>

        {/* Imagem Ilustrativa */}
        <div className="absolute bottom-4 right-10 w-64 h-64">
          <Image
            src="/illustration-login.png"
            alt="Ilustração de boas-vindas"
            fill
            className="object-contain"
          />
        </div>
      </div>

    </div>
  );
}
