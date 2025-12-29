# RAG GenAI Pipeline

This repository contains a Jupyter Notebook (`rag_genai_pipeline.ipynb`) that demonstrates an end-to-end **Retrieval-Augmented Generation (RAG)** pipeline using open-source tools. The pipeline ingests documents, chunks them, generates embeddings, stores them in a vector database, retrieves relevant context, and uses a generative model to produce answers.

---

## 📌 Features

* Load documents from local directories (PDF and text files)
* Chunk documents for efficient retrieval
* Generate embeddings using **Sentence Transformers**
* Store and query embeddings with **ChromaDB**
* Retrieve relevant document chunks via cosine similarity
* Generate answers using a **Hugging Face Transformers** text-generation pipeline

---

## 🧱 Architecture Overview

1. **Document Ingestion**

   * PDFs loaded using `PyPDFLoader` / `PyMuPDFLoader`
   * Text files loaded using `TextLoader`

2. **Chunking**

   * Documents are split into smaller chunks using `RecursiveCharacterTextSplitter`

3. **Embedding Generation**

   * Embeddings created using `sentence-transformers`

4. **Vector Storage**

   * Embeddings stored in **ChromaDB** with persistent configuration

5. **Retrieval**

   * Query embeddings compared with stored vectors using cosine similarity

6. **Generation**

   * Retrieved context passed to a Hugging Face `pipeline` for text generation

---

## 📂 Project Structure

```
rag_genai_pipeline.ipynb   # Main notebook implementing the RAG pipeline
```

---

## 🛠️ Dependencies

The notebook relies on the following key libraries:

* `langchain-community`
* `langchain-text-splitters`
* `chromadb`
* `sentence-transformers`
* `transformers`
* `scikit-learn`
* `numpy`

---

## ⚙️ Setup Instructions

1. **Create a virtual environment (optional but recommended)**

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\\Scripts\\activate
   ```

2. **Install dependencies**

   ```bash
   pip install langchain-community langchain-text-splitters chromadb \
               sentence-transformers transformers scikit-learn numpy
   ```

3. **Launch Jupyter Notebook**

   ```bash
   jupyter notebook
   ```

4. Open `rag_genai_pipeline.ipynb` and run the cells sequentially.

---

## ▶️ Usage

1. Place your PDF or text documents in the specified input directory.
2. Run the document processing and chunking cells.
3. Generate and store embeddings in ChromaDB.
4. Enter a query.
5. The pipeline retrieves relevant chunks and generates a response based on them.

---

## 🧪 Example Use Cases

* Question answering over private documents
* Knowledge base assistants
* Research paper summarization
* Internal documentation search

---

## 🚧 Notes & Limitations

* This notebook is intended as a **prototype / educational example**.
* Performance and accuracy depend on the chosen embedding and generation models.
* For production use, consider:

  * Better prompt engineering
  * Re-ranking retrieved results
  * Scalable vector databases




