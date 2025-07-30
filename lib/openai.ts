const OPENAI_API_KEY = "demo-openai-key";

export async function generateNotes(
  subject: string,
  topic: string,
  language: string = "english"
) {
  try {
    // Mock response for demo purposes
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const mockContent =
      language === "english"
        ? `# ${subject} - ${topic}

## Key Points:
1. Important concept related to ${topic}
2. Historical background and context
3. Current relevance for UPSC examination
4. Key figures and their contributions
5. Related government policies and schemes

## Detailed Notes:
This is a comprehensive overview of ${topic} in the context of ${subject}. The topic is crucial for UPSC preparation as it covers fundamental concepts that are frequently tested in both Preliminary and Main examinations.

### Important Facts:
- Fact 1 about ${topic}
- Fact 2 with statistical data
- Recent developments and updates
- Constitutional provisions (if applicable)

### Exam Strategy:
- Focus on factual accuracy
- Remember key dates and figures
- Understand cause-effect relationships
- Practice previous year questions

### Additional Resources:
- Recommended books and articles
- Government reports and white papers
- Online resources for further reading`
        : `# ${subject} - ${topic}

## मुख्य बिंदु:
1. ${topic} से संबंधित महत्वपूर्ण अवधारणा
2. ऐतिहासिक पृष्ठभूमि और संदर्भ
3. UPSC परीक्षा के लिए वर्तमान प्रासंगिकता
4. मुख्य व्यक्तित्व और उनके योगदान
5. संबंधित सरकारी नीतियां और योजनाएं

## विस्तृत नोट्स:
यह ${subject} के संदर्भ में ${topic} का एक व्यापक अवलोकन है। यह विषय UPSC की तैयारी के लिए महत्वपूर्ण है क्योंकि यह मौलिक अवधारणाओं को कवर करता है जो प्रारंभिक और मुख्य दोनों परीक्षाओं में अक्सर परीक्षित होते हैं।`;

    return mockContent;
  } catch (error) {
    console.error("Error generating notes:", error);
    return language === "english"
      ? `# Sample Notes for ${subject} - ${topic}\n\nThis is a demo note generated for ${topic} under ${subject}. In production, this would be generated using OpenAI API.`
      : `# ${subject} - ${topic} के लिए नमूना नोट्स\n\nयह ${subject} के अंतर्गत ${topic} के लिए एक डेमो नोट है। उत्पादन में, यह OpenAI API का उपयोग करके उत्पन्न होगा।`;
  }
}

export async function generateMCQs(subject: string, count: number = 5) {
  try {
    // Mock response for demo purposes
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const mockMCQs = Array.from({ length: count }, (_, index) => ({
      question: `Sample MCQ ${
        index + 1
      } for ${subject}: Which of the following is correct?`,
      options: [
        "Option A - First choice",
        "Option B - Second choice",
        "Option C - Third choice",
        "Option D - Fourth choice",
      ],
      correctAnswer: Math.floor(Math.random() * 4),
      explanation: `This is the explanation for question ${
        index + 1
      }. The correct answer is based on fundamental concepts of ${subject}.`,
    }));

    return mockMCQs;
  } catch (error) {
    console.error("Error generating MCQs:", error);
    return [];
  }
}
