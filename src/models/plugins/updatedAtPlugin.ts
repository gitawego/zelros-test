import mongoose from 'mongoose';
export function updatedAtPlugin(schema: mongoose.Schema, options: any) {
  schema.add({
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: Date
  });
  schema.pre('save', function (next) {
    const now = new Date();
    console.log('save', this.isModified(), this._id.toString());
    if (!this.isModified()) {
      next();
      return;
    }
    if (!this.createdAt) {
      this.createdAt = now;
    } else if (typeof (this.createdAt) === 'string') {
      this.createdAt = new Date(this.createdAt);
    }
    if (!this.updatedAt || typeof (this.updatedAt) === 'string') {
      this.updatedAt = new Date(this.updatedAt || now);
    } else {
      this.updatedAt = now;
    }
    next();
  });

  ['update', 'findOneAndUpdate'].forEach(key => {
    schema.pre(key, function (next) {
      const update = this.getUpdate();
      let updatedAt = new Date();
      if (update.$set && typeof (update.$set.updatedAt) === 'string') {
        updatedAt = new Date(update.$set.updatedAt);
      }
      this.update({}, {
        $set: {
          updatedAt
        }
      });
      next();
    });
  });

  if (options && options.index) {
    schema.path('createdAt').index(options.index);
    schema.path('updatedAt').index(options.index);
  }
}
