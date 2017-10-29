export default function() {
  this.route('styleguide', function() {
    this.route('components', function() {
      this.route('foo-bar');
      this.route('svg', function() {
        this.route('sprite-icon');
      });
    });
  });
}
