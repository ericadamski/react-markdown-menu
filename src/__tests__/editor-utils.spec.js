import { bold, header, link, quote, italic } from '../editor-utils';

describe('editor', () => {
  describe('.bold', () => {
    it('should be a function with arity 1', () => {
      // Assert
      expect(typeof bold).toBe('function');
      expect(bold.length).toEqual(1);
    });

    it('it should return a markdown bolded string', () => {
      // Arrange
      const str = 'sandwich';
      const expectedStr = `__${str}__`;

      // Act
      const result = bold(str);

      // Assert
      expect(result).toEqual(expectedStr);
    });

    it('should unbold if the text is already bold', () => {
      // Arrange
      const expectedStr = 'sandwich';
      const str = `__${expectedStr}__`;

      // Act
      const result = bold(str);

      // Assert
      expect(result).toEqual(expectedStr);
    });
  });

  describe('.header', () => {
    it('should be a function with arity 1', () => {
      // Assert
      expect(typeof header).toBe('function');
      expect(header.length).toEqual(2);
    });

    it('it should return a markdown header string', () => {
      // Arrange
      const str = 'this should be a line sandwich';
      const expectedStr = `# ${str}`;

      // Act
      const result = header(1, str);

      // Assert
      expect(result).toEqual(expectedStr);
    });

    it('it should return a markdown header (2) string', () => {
      // Arrange
      const str = 'this should be a line sandwich';
      const expectedStr = `## ${str}`;

      // Act
      const result = header(2, str);

      // Assert
      expect(result).toEqual(expectedStr);
    });

    it('should unheader if the line is already a header', () => {
      // Arrange
      const expectedStr = 'this should be a line sandwich';
      const str = `## ${expectedStr}`;

      // Act
      const result = header(1, str);

      // Assert
      expect(result).toEqual(expectedStr);
    });
  });

  describe('.italic', () => {
    it('should be a function with arity 1', () => {
      // Assert
      expect(typeof italic).toBe('function');
      expect(italic.length).toEqual(1);
    });

    it('it should return a markdown italic string', () => {
      // Arrange
      const str = 'sandwich';
      const expectedStr = `_${str}_`;

      // Act
      const result = italic(str);

      // Assert
      expect(result).toEqual(expectedStr);
    });

    it('should unitalic if the text is already italic', () => {
      // Arrange
      const expectedStr = 'sandwich';
      const str = `_${expectedStr}_`;

      // Act
      const result = italic(str);

      // Assert
      expect(result).toEqual(expectedStr);
    });
  });

  describe('.link', () => {
    it('should be a function with arity 1', () => {
      // Assert
      expect(typeof link).toBe('function');
      expect(link.length).toEqual(1);
    });

    it('it should return a markdown link string', () => {
      // Arrange
      const str = 'sandwich';
      const expectedStr = `[${str}]()`;

      // Act
      const result = link(str);

      // Assert
      expect(result).toEqual(expectedStr);
    });

    it('should unlink if the text is already link', () => {
      // Arrange
      const expectedStr = 'sandwich';
      const str = `[${expectedStr}](http://google.ca)`;

      // Act
      const result = link(str);

      // Assert
      expect(result).toEqual(expectedStr);
    });

    it('should unlink if the text is already link, but empty', () => {
      // Arrange
      const expectedStr = 'sandwich';
      const str = `[${expectedStr}]()`;

      // Act
      const result = link(str);

      // Assert
      expect(result).toEqual(expectedStr);
    });
  });

  describe('.quote', () => {
    it('should be a function with arity 1', () => {
      // Assert
      expect(typeof quote).toBe('function');
      expect(quote.length).toEqual(1);
    });

    it('it should return a markdown quote string', () => {
      // Arrange
      const str = 'this should be a line sandwich';
      const expectedStr = `> ${str}`;

      // Act
      const result = quote(str);

      // Assert
      expect(result).toEqual(expectedStr);
    });

    it('should unquote if the line is already a quote', () => {
      // Arrange
      const expectedStr = 'this should be a line sandwich';
      const str = `> ${expectedStr}`;

      // Act
      const result = quote(str);

      // Assert
      expect(result).toEqual(expectedStr);
    });
  });
});
