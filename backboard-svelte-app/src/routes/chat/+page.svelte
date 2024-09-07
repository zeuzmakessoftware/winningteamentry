<script lang="ts">
    let userInput = '';
    let conversation = [];
    let loading = false;
    let selectedFile: File | null = null;
  
    // Function to handle sending the user's prompt or file to the backend
    const sendMessage = async () => {
      if (!userInput && !selectedFile) return;
  
      // Add user's message or file to the conversation
      if (selectedFile) {
        conversation = [
          ...conversation,
          { role: 'user', content: `File: ${selectedFile.name}` },
        ];
      } else {
        conversation = [...conversation, { role: 'user', content: userInput }];
      }
  
      loading = true;
  
      try {
        // Add an empty bot message to the conversation where we will stream the text
        let botMessage = { role: 'bot', content: '' };
        conversation = [...conversation, botMessage];
  
        // If the user uploaded a file, send it as form data
        let body;
        if (selectedFile) {
          const formData = new FormData();
          formData.append('file', selectedFile);
          body = formData;
        } else {
          body = JSON.stringify({ prompt: userInput });
        }
  
        const response = await fetch('/api/summarizer', {
          method: 'POST',
          headers: selectedFile ? {} : { 'Content-Type': 'application/json' },
          body: selectedFile ? body : JSON.stringify({ prompt: userInput }),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const result = await response.text();
  
        const streamText = (text: string) => {
          let i = 0;
          const interval = setInterval(() => {
            if (i < text.length) {
              botMessage.content += text.charAt(i);
              conversation = [...conversation]; // Trigger re-render
              i++;
            } else {
              clearInterval(interval);
            }
          }, 20); // Typing effect speed
        };
  
        streamText(result);
      } catch (error) {
        console.error('Error:', error);
        conversation = [
          ...conversation,
          { role: 'bot', content: 'Error: Could not get a response.' },
        ];
      } finally {
        loading = false;
        userInput = ''; // Clear input field after sending
        selectedFile = null; // Clear the selected file after sending
      }
    };
  
    // Handle file selection
    const handleFileChange = (event: Event) => {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
        selectedFile = input.files[0];
      }
    };
  </script>
  
  <!-- Chat interface -->
  <div class="flex flex-col min-h-[90vh] bg-gray-100">
    <!-- Message container with scrollable content -->
    <div class="flex-grow overflow-y-auto p-6 max-h-[90vh]">
      {#each conversation as message}
        <div class="{message.role === 'user' ? 'user-message' : 'bot-message'} mb-4">
          <div class="{message.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-black'} p-4 rounded-lg shadow-md max-w-xs sm:max-w-md">
            {message.content}
          </div>
        </div>
      {/each}
  
      {#if loading}
        <div class="text-center text-gray-500">Loading...</div>
      {/if}
    </div>
  
    <!-- Input section -->
    <div class="bg-white p-4 border-t border-gray-200">
      <div class="flex space-x-3 items-center">
        <input
          type="text"
          bind:value={userInput}
          class="flex-grow p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:outline-none transition"
          placeholder="Type your message here..."
          on:keydown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <!-- File upload input -->
            <div class="relative">
            <input type="file" on:change={handleFileChange} class="absolute inset-0 opacity-0 w-full h-full cursor-pointer" />
            <div class="flex items-center justify-center bg-blue-500 hover:bg-blue-500 transition text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                {selectedFile ? selectedFile.name : "Upload File"}
            </div>
            </div>        
        <button
          on:click={sendMessage}
          disabled={loading}
          class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 disabled:opacity-50 transition"
        >
          Send
        </button>
      </div>
    </div>
  </div>
  
  <style>
    html, body {
      overflow: hidden;
    }
  </style>