<script lang="ts">
  import Logo from "$lib/images/backboard-logo.svg";
  import { page } from '$app/stores';
  let isMenuOpen = false;

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }
</script>

<nav class="border-b-2 p-4">
  <div class="container mx-auto flex justify-between items-center">
    <logo class="inline-flex gap-2">
      <a class="w-fit" data-sveltekit-reload href="/"
        ><img src={Logo} alt="casa-logo-full-purple" /></a
      >
      <div class="text-black text-xl">Backboard</div>
    </logo>

    <div class="hidden md:flex space-x-4">
      <a href="/" class="hover:text-gray-300" class:text-accent={$page.url.pathname === '/'}>dashboard</a>
      <a href="/chat" class="hover:text-gray-300" class:text-accent={$page.url.pathname === '/chat'}>chat</a>
    </div>

    <button
      on:click={toggleMenu}
      class="md:hidden text-black focus:outline-none"
    >
      <svg
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16m-7 6h7"
        ></path>
      </svg>
    </button>
  </div>

  {#if isMenuOpen}
    <div class="md:hidden mt-4">
      <a href="/" class="block py-2 px-4 text-sm hover:bg-gray-700" class:text-accent={$page.url.pathname === '/'}
        >dashboard</a
      >
      <a
        href="/chat"
        class="block py-2 px-4 text-sm hover:bg-gray-700" class:text-accent={$page.url.pathname === '/chat'}>chat</a
      >
    </div>
  {/if}
</nav>
