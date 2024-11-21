import React from "react";
import Image from "next/image";
import logo from "@/public/logo/logo.png";
import discord from "@/public/socials/discord.svg";
import github from "@/public/socials/github.svg";
import instagram from "@/public/socials/instagram.svg";
import linkedin from "@/public/socials/linkedin.svg";
import spotify from "@/public/socials/spotify.svg";
import telegram from "@/public/socials/telegram.svg";
import whatsapp from "@/public/socials/whatsapp.svg";
export default function Footer() {
  return (
    <footer
      className="footer mt-auto footer-center p-10 bg-gradient-to-r from-blue-900 to-indigo-900
    text-white text-center"
    >
      <aside className="mb-4 text-center">
        <Image src={logo} width={200} alt="CodeRIT Logo" className="mx-auto" />
        <p className="font-bold">
          CodeRIT <br />A community that helps develop the Coding culture of RIT
        </p>
        <p>Ramaiah Institute of Technology</p>
      </aside>
      <div className="flex w-full justify-center gap-x-6">
        <a href="https://discord.gg/pmfYHf6cER" target="_blank">
          <Image
            src={discord}
            width={25}
            alt="CodeRIT Discord"
            className="mx-auto"
          />
        </a>
        <a href="https://github.com/CodeRIT-0" target="_blank">
          <Image
            src={github}
            width={25}
            alt="CodeRIT GitHub"
            title="CodeRIT GitHub"
            className="mx-auto"
          />
        </a>
        <a href="https://www.instagram.com/code_rit/" target="_blank">
          <Image
            src={instagram}
            width={25}
            alt="CodeRIT Instagram"
            title="CodeRIT Instagram"
            className="mx-auto"
          />
        </a>
        <a href="https://www.linkedin.com/company/coderitclub/" target="_blank">
          <Image
            src={linkedin}
            width={25}
            alt="CodeRIT LinkedIn"
            title="CodeRIT LinkedIn"
            className="mx-auto"
          />
        </a>
        <a href="https://open.spotify.com/playlist/2pDdRKCyQaFljLRRwmMWgl?si=0796be04870f42c8" target="_blank">
          <Image
            src={spotify}
            width={25}
            alt="The Best Coding Playlist"
            title="The Best Coding Playlist"
            className="mx-auto"
          />
        </a>
        <a href="https://t.me/+JkfLZPe6p0cyNmY9" target="_blank">
          <Image
            src={telegram}
            width={25}
            alt="CodeRIT Telegram"
            title="CodeRIT Telegram"
            className="mx-auto"
          />
        </a>
        <a href="https://chat.whatsapp.com/FeFzoAe63rpAaZPrTCYjyx" target="_blank">
          <Image
            src={whatsapp}
            width={25}
            alt="CodeRIT WhatsApp Community"
            title="CodeRIT WhatsApp Community"
            className="mx-auto"
          />
        </a>
      </div>
    </footer>
  );
}
