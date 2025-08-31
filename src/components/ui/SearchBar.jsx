import React, { useState, useRef, useEffect } from 'react';
import Icon from '../AppIcon';

const SearchBar = ({ 
  onSearch, 
  onSuggestionClick,
  onClear,
  value,
  onSearchSubmit,
  showSuggestionsOnFocus = true,
  placeholder = "Buscar produtos ou vendedores...",
  suggestions = [],
  showSuggestions = true,
  enableVoiceSearch = true,
  className = '' 
}) => {
  const [query, setQuery] = useState(value || '');
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const inputRef = useRef(null);

  // Update internal query when external value changes
  useEffect(() => {
    setQuery(value || '');
  }, [value]);

  // Initialize speech recognition
  useEffect(() => {
    if (enableVoiceSearch && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'pt-BR';

      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        onSearch?.(transcript);
        setIsListening(false);
      };

      recognitionInstance.onerror = () => {
        setIsListening(false);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }
  }, [enableVoiceSearch, onSearch]);

  useEffect(() => {
    if (query?.length > 0 && showSuggestions && suggestions?.length > 0) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [query, showSuggestions, suggestions]);

  const handleSubmit = (e) => {
    e?.preventDefault();
    const trimmedQuery = query?.trim();
    onSearchSubmit?.(trimmedQuery);
    onSearch?.(trimmedQuery);
    setIsOpen(false);
    inputRef?.current?.blur();
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion?.name || suggestion?.label || suggestion);
    onSuggestionClick?.(suggestion);
    setIsOpen(false);
    inputRef?.current?.blur();
  };

  const handleInputChange = (e) => {
    const newValue = e?.target?.value;
    setQuery(newValue);
    onSearch?.(newValue);
  };

  const handleClear = () => {
    setQuery('');
    onClear?.();
    setIsOpen(false);
    inputRef?.current?.focus();
  };

  const startVoiceSearch = () => {
    if (recognition && !isListening) {
      setIsListening(true);
      recognition.start();
    }
  };

  const getIconForType = (type) => {
    switch (type) {
      case 'vendor': return 'Store';
      case 'product': return 'Apple';
      case 'location': return 'MapPin';
      default: return 'Search';
    }
  };

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Icon
            name="Search"
            size={18}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
          />
          <input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={handleInputChange}
            onFocus={() => showSuggestionsOnFocus && query?.length > 0 && showSuggestions && suggestions?.length > 0 && setIsOpen(true)}
            className="w-full pl-10 pr-20 py-3 bg-background border border-border rounded-lg text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
            {query && (
              <button
                type="button"
                onClick={handleClear}
                className="p-1 text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                <Icon name="X" size={16} />
              </button>
            )}
            {enableVoiceSearch && recognition && (
              <button
                type="button"
                onClick={startVoiceSearch}
                className={`p-1 rounded-full transition-colors duration-200 ${
                  isListening
                    ? 'text-error bg-error/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={isListening ? "MicOff" : "Mic"} size={16} />
              </button>
            )}
          </div>
        </div>
      </form>

      {isOpen && suggestions?.length > 0 && showSuggestions && query?.length > 0 && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto animate-slide-down">
            {suggestions?.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-muted transition-colors duration-200"
              >
                <Icon name={getIconForType(suggestion?.type)} size={16} className="text-muted-foreground" />
                <div className="flex-1">
                  <span className="text-sm font-body font-medium text-foreground">
                    {suggestion?.name || suggestion?.label || suggestion}
                  </span>
                  {suggestion?.category && (
                    <span className="ml-2 text-xs font-caption text-muted-foreground">
                      {suggestion?.category}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchBar;