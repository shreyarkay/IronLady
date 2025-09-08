import openai

class IronLadyChatbot:
    def __init__(self, api_key):
        openai.api_key = api_key
        self.greet()

    def greet(self):
        print("Welcome to the Iron Lady Leadership Programs Chatbot!")
        print("I'm here to answer your FAQs. Type 'exit' to end the chat.")

    def get_response(self, user_input):
        try:
            response = openai.ChatCompletion.create(
                model="gpt-4",  # Specify the model you want to use
                messages=[
                    {"role": "user", "content": user_input}
                ]
            )
            return response.choices[0].message['content'].strip()
        except Exception as e:
            return f"Error fetching response: {e}"

    def chat(self):
        while True:
            user_input = input("You: ")
            if user_input.lower() == 'exit':
                print("Thank you for chatting! Goodbye!")
                break
            response = self.get_response(user_input)
            print("Chatbot:", response)

# Run the chatbot
if __name__ == "__main__":
    api_key = "YOUR_OPENAI_API_KEY"  # Replace with your OpenAI API key
    chatbot = IronLadyChatbot(api_key)
    chatbot.chat()
