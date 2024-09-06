<script lang="ts">
    let isMenuOpen = false;

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
    }
</script>

<nav class="bg-gray-800 p-4">
    <div class="container mx-auto flex justify-between items-center">
        <div class="text-white font-bold text-xl">Logo</div>
        
        <div class="hidden md:flex space-x-4">
            <a href="/" class="text-white hover:text-gray-300">Home</a>
            <a href="/about" class="text-white hover:text-gray-300">About</a>
            <a href="/contact" class="text-white hover:text-gray-300">Contact</a>
            <a href="/login" class="text-white hover:text-gray-300">Login</a>
        </div>
        
        <button on:click={toggleMenu} class="md:hidden text-white focus:outline-none">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
        </button>
    </div>
    
    {#if isMenuOpen}
        <div class="md:hidden">
            <a href="/" class="block py-2 px-4 text-sm text-white hover:bg-gray-700">Home</a>
            <a href="/about" class="block py-2 px-4 text-sm text-white hover:bg-gray-700">About</a>
            <a href="/contact" class="block py-2 px-4 text-sm text-white hover:bg-gray-700">Contact</a>
            <a href="/login" class="block py-2 px-4 text-sm text-white hover:bg-gray-700">Login</a>
        </div>
    {/if}
</nav>