import pandas as pd
import numpy as np
from subprocess import check_output

train_df = pd.read_csv("../input/train.csv")
test_df = pd.read_csv("../input/test.csv")

x_train = np.array(train_df.iloc[:,1:].values)

y_train = np.array(train_df.iloc[:,0].values)

from sklearn.linear_model import LogisticRegression

x_test = np.array(test_df.iloc[:, 0:].values)

model = LogisticRegression(C = 1e5)
model.fit(x_train, y_train)

y_pre = model.predict(x_test)

submissions=pd.DataFrame({"ImageId": list(range(1,len(y_pre)+1)),
                         "Label": y_pre})
submissions.to_csv("mnist_tfkeras.csv", index=False, header=True)